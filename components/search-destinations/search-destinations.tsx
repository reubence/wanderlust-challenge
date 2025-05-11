"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Mic, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState, useRef } from "react";
import { Destination } from "@prisma/client";
import DestinationItem from "./destination-item";

const SearchDestinations = () => {
  const [inputValue, setInputValue] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<Destination[]>([]);
  const [searchError, setSearchError] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        const formData = new FormData();
        formData.append("audio", audioBlob);

        try {
          const response = await fetch("/api/transcribe", {
            method: "POST",
            body: formData,
          });

          if (!response.ok) {
            throw new Error("Transcription failed");
          }

          const data = await response.json();
          setInputValue(data.transcript);
        } catch (error) {
          console.error("Error transcribing audio:", error);
        }

        // Stop all audio tracks
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    setIsSearching(true);
    setSearchError(null);

    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: inputValue.trim(),
          limit: 10,
        }),
      });

      if (!response.ok) {
        throw new Error("Search failed");
      }

      const data = await response.json();
      setSearchResults(data.results);
    } catch (error) {
      console.error("Error searching:", error);
      setSearchError("Failed to perform search. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };
  return (
    <>
      <form onSubmit={handleSearch}>
        <Card className="w-full mb-6">
          <CardHeader>
            <CardTitle>Travel Search</CardTitle>
            <CardDescription>
              Find your next adventure with our intelligent search
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input
                type="text"
                placeholder="Search destinations..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <Button type="submit" disabled={isSearching}>
                {isSearching ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Search className="h-4 w-4 mr-2" />
                )}
                Search
              </Button>
              <Button
                variant="outline"
                onClick={isRecording ? stopRecording : startRecording}
                className={isRecording ? "bg-red-500 hover:bg-red-600" : ""}
                type="button"
              >
                <Mic className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <p className="text-sm text-muted-foreground">
              Try voice search or explore trending destinations
            </p>
            <Link
              href="/api/ping"
              className="text-sm text-blue-500 hover:underline"
            >
              API Status
            </Link>
          </CardFooter>
        </Card>
      </form>

      {searchError && (
        <Card className="w-full mb-6 border-red-500">
          <CardContent className="pt-6">
            <p className="text-red-500">{searchError}</p>
          </CardContent>
        </Card>
      )}

      {searchResults.length > 0 && (
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Search Results</CardTitle>
            <CardDescription>
              Found {searchResults.length} destinations matching your search
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {searchResults.map((destination) => (
                <DestinationItem
                  key={destination.id}
                  destination={destination}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default SearchDestinations;
