<<<<<<< HEAD
'use client'

import { useState } from "react";
import axios from "axios";
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

export default function Home() {
  const [query, setQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingError, setRecordingError] = useState("");
  const [transcriptionError, setTranscriptionError] = useState("");
  const [results, setResults] = useState([]);

  // Handles text-based search
  const handleSearch = async () => {
    if (!query.trim()) {
      alert("Please enter a search query.");
      return;
    }

    try {
      setLoading(true);
      setHasSearched(true);
      const response = await axios.post("/api/search", { query });
      setResults(response.data.results || []);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handles microphone recording and sends audio to /api/transcribe
  const handleMicClick = async () => {
    try {
      setRecordingError("");
      setTranscriptionError("");
      setIsRecording(true); // Set recording flag

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunks, { type: 'audio/webm' });
        const formData = new FormData();
        formData.append('audio', audioBlob, 'recording.webm');
        formData.append('language', 'en');

        try {
          const res = await fetch('/api/transcribe', {
            method: 'POST',
            body: formData,
          });

          const data = await res.json();

          if (data.transcript) {
            const transcript = data.transcript.trim();
            setQuery(transcript); // Update input field
          } else {
            setTranscriptionError(data.error || "Unknown error occurred");
          }
        } catch (err) {
          setTranscriptionError("Failed to transcribe audio.");
        } finally {
          setIsRecording(false);
        }
      };

      mediaRecorder.start();

      // Stop after 3 seconds
      setTimeout(() => {
        mediaRecorder.stop();
        stream.getTracks().forEach(track => track.stop()); // Close the mic
      }, 3000);
    } catch (err) {
      console.error('Mic access or recording failed:', err);
      setRecordingError('Mic access or recording failed. Check permissions.');
      setIsRecording(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm p-4">
=======
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Mic } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
>>>>>>> a3c8059ba15d313e565573fe079cef40d7902851
        <h1 className="text-4xl font-bold text-center mb-8">Wanderlust Search</h1>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Travel Search</CardTitle>
<<<<<<< HEAD
            <CardDescription>
              Find your next adventure with our intelligent search
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
              }}
              className="flex w-full max-w-sm items-center space-x-2"
            >
              <Input
                type="text"
                placeholder="Search destinations..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <Button type="submit" disabled={loading || isRecording}>
                {loading ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Search className="h-4 w-4 mr-2" />
                )}
                Search
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleMicClick}
                disabled={isRecording || loading}
              >
                {isRecording ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Mic className="h-4 w-4" />
                )}
                {isRecording ? "Recording..." : "Voice"}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex justify-between">
            <p className="text-sm text-muted-foreground">
              Try voice search or explore trending destinations
            </p>
=======
            <CardDescription>Find your next adventure with our intelligent search</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input type="text" placeholder="Search destinations..." />
              <Button type="submit">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
              <Button variant="outline">
                <Mic className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <p className="text-sm text-muted-foreground">Try voice search or explore trending destinations</p>
>>>>>>> a3c8059ba15d313e565573fe079cef40d7902851
            <Link href="/api/ping" className="text-sm text-blue-500 hover:underline">
              API Status
            </Link>
          </CardFooter>
<<<<<<< HEAD

          <div
            className={`flex justify-center items-center flex-col mt-1 mb-1 rounded p-2 ${hasSearched && "border-2 border-zinc-600"}`}
          >
            {hasSearched && loading && (
              <p className="text-sm text-muted-foreground">Searching...</p>
            )}

            {hasSearched && !loading && results?.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No results found. Try a different search.
              </p>
            )}

            {!loading && results.map((result, index) => (
              <div key={index} className="flex items-center space-x-4 text-sm text-center mb-4">
                {result.imageUrl && (
                  <img
                    src={result.imageUrl}
                    alt={`Image of ${result.name}`}
                    className="w-32 h-32 object-cover rounded"
                  />
                )}
                <div>
                  <strong>{result.name}</strong>: {result.location} - {result.description}
                </div>
              </div>
            ))}

            {recordingError && <p className="text-sm text-red-500">{recordingError}</p>}
            {transcriptionError && <p className="text-sm text-red-500">{transcriptionError}</p>}
          </div>
        </Card>
      </div>
    </main>
  );
=======
        </Card>
      </div>
    </main>
  )
>>>>>>> a3c8059ba15d313e565573fe079cef40d7902851
}
