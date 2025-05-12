"use client";
import { useState } from "react";
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
import { Search, Mic } from "lucide-react";
import Link from "next/link";
import axios from "axios";

export default function Home() {
  const [query, setQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  interface SearchResult {
    name: string;
    location: string;
    description: string;
    imageUrl?: string;
  }

  const [results, setResults] = useState<SearchResult[]>([]);
  const [isRecording, setIsRecording] = useState(false);

  const handleSearch = async () => {
    try {
      setHasSearched(true);
      const response = await axios.post("/api/search", { query });
      setResults(response.data.results);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  const handleMicClick = async () => {
    if (!navigator.mediaDevices || !window.MediaRecorder) {
      alert("Your browser does not support audio recording.");
      return;
    }

    try {
      setIsRecording(true);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const mimeType = MediaRecorder.isTypeSupported("audio/webm")
        ? "audio/webm"
        : "audio/mp4";

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: mimeType,
      });

      const audioChunks: Blob[] = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        stream.getTracks().forEach((track) => track.stop());
        setIsRecording(false);

        const audioBlob = new Blob(audioChunks, { type: mimeType });

        const fileExtension = mimeType === "audio/webm" ? "webm" : "mp4";
        const fileName = `recording.${fileExtension}`;

        const formData = new FormData();
        formData.append("audio", audioBlob, fileName);

        try {
          const response = await fetch("/api/transcribe", {
            method: "POST",
            body: formData,
          });

          if (!response.ok) throw new Error("Failed to transcribe audio");

          const data = await response.json();

          if (data.transcript) {
            const cleanedString = data.transcript.trim().replace(/\n/g, '');
            setQuery(cleanedString);
          } else {
            console.error("No transcript received");
            setQuery("");
          }
        } catch (error) {
          console.error("Transcription error:", error);
          setQuery("");
        }
      };

      mediaRecorder.start();

      setQuery("Recording audio...");

      setTimeout(() => {
        mediaRecorder.stop();
      }, 3000);
    } catch (error) {
      console.error("Audio recording error:", error);
      setIsRecording(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">
          Wanderlust Search
        </h1>

        <Card className="w-full">
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
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <Button type="button" onClick={handleSearch}>
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
              <Button
                variant="outline"
                onClick={handleMicClick}
                disabled={isRecording}
              >
                <Mic className="h-4 w-4" />
                {isRecording ? "Recording..." : ""}
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
          <div className="flex justify-center items-center flex-col mt-1 mb-1">
            {hasSearched && results.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No results found. Try a different search.
              </p>
            ) : (
              results.map((result, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 text-sm text-center mb-4"
                >
                  {result.imageUrl && (
                    <img
                      src={result.imageUrl}
                      alt={result.name}
                      className="w-32 h-32 object-cover rounded"
                    />
                  )}
                  <div>
                    <strong>{result.name}</strong>: {result.location} - {result.description}
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </main>
  );
}
