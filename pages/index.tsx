/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import { Check, CheckCircle2Icon, X } from 'lucide-react';
import Button from '@/components/ui/button';
import Card from '@/components/ui/card';
import Input from '@/components/ui/input';
import VideoPlayer from '@/components/ui/video-player';
import * as events from '@/lib/events';
import { Event } from '@/lib/events';

export default function Home() {
  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);
  const [licenseNumber, setLicenseNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [waitingForAction, setWaitingForAction] = useState(false);

  const [currentVideo, setCurrentVideo] = useState<Event | null>(null);
  const [progress, setProgress] = useState({ reviewed: 0, total: 0 });

  const issues = [
    'False Positive Event',
    'Main Camera Issue',
    'License Plate Issue',
    'DMV Information Issue',
  ];

  useEffect(() => {
    const init = async () => {
      try {
        setIsLoading(true);
        const progressData = await events.getProgress();
        setProgress(progressData);
        const video = await events.getNextVideo();
        setCurrentVideo(video);
      } finally {
        setIsLoading(false);
      }
    };

    init();
  }, []);

  const toggleIssue = (issue: string) => {
    setSelectedIssues((prev) =>
      prev.includes(issue) ? prev.filter((i) => i !== issue) : [...prev, issue]
    );
  };

  const handleAction = async (status: 'accepted' | 'rejected') => {
    if (!currentVideo) return;

    try {
      setWaitingForAction(true);
      await events.markVideo(currentVideo.id, status);

      setProgress((p) => ({ ...p, reviewed: p.reviewed + 1 }));
      const next = await events.getNextVideo();
      setCurrentVideo(next);
    } finally {
      setWaitingForAction(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-100px)] flex items-center justify-center">
        <h2 className="text-xl">Loading...</h2>
      </div>
    );
  }

  if (!currentVideo) {
    return (
      <div className="p-6 flex flex-col gap-2 items-center justify-center min-h-[calc(100vh-100px)]">
        <CheckCircle2Icon className="text-green-700 h-10 w-10" />
        <h2 className="text-xl font-semibold">All videos reviewed!</h2>
        <p>
          Progress: {progress.reviewed}/{progress.total}
        </p>
      </div>
    );
  }

  return (
    <div className="font-sans min-h-screen pb-20 p-8">
      <main className="relative space-y-10">
        {waitingForAction && (
          <div className="fixed z-10 inset-0 bg-white/50 flex items-center justify-center">
            <h2 className="text-xl font-semibold text-gray-900">
              Processing...
            </h2>
          </div>
        )}
        <h2 className="text-center text-3xl font-semibold text-gray-900">
          {progress.reviewed} / {progress.total}{' '}
          <span className="text-sm">reviewed</span>
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white shadow-sm space-y-3">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Traffic Violation
              </h2>
              <p className="text-sm text-gray-600">
                Review the traffic violation event
              </p>
            </div>
            <VideoPlayer src={currentVideo.video_url} />
          </Card>

          {/* License Plate Card */}
          <Card className="bg-white shadow-sm space-y-3">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                License Plate
              </h3>
              <p className="text-sm text-gray-600">
                Verify the license plate number
              </p>
            </div>

            <div className="bg-gray-100 rounded-lg p-8 text-center">
              <img
                src={currentVideo.license_plate_image_url || ''}
                alt="License Plate"
                className="mx-auto rounded max-h-60 object-contain"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="license-number"
                className="text-sm font-medium text-gray-700"
              >
                License Plate Number
              </label>
              <div className="flex gap-2">
                <Input
                  id="license-number"
                  placeholder="Enter license plate number"
                  value={licenseNumber}
                  onChange={(e) => setLicenseNumber(e.target.value)}
                  className="flex-1"
                />
                <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6">
                  Lookup DMV
                </Button>
              </div>
            </div>
          </Card>
        </div>
        <Card className="bg-white shadow-sm space-y-2">
          <header>
            <h3 className="text-xl font-semibold text-gray-900">
              Issue Selection
            </h3>
            <p className="text-sm text-gray-600">
              Select any issues with this event (if rejecting)
            </p>
          </header>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {issues.map((issue) => (
              <Button
                key={issue}
                variant={selectedIssues.includes(issue) ? 'primary' : 'outline'}
                className={`h-10 p-4 text-sm font-medium ${
                  selectedIssues.includes(issue)
                    ? '!bg-gray-100 border-2 !border-blue-500 !text-gray-800'
                    : ''
                }`}
                onClick={() => toggleIssue(issue)}
              >
                {issue}
              </Button>
            ))}
          </div>
        </Card>

        <div className="flex justify-center gap-4">
          <Button
            className="!bg-green-600 hover:!bg-green-500 h-14 px-6"
            onClick={() => handleAction('accepted')}
          >
            <Check className="w-5 h-5" />
            Accept Event
          </Button>
          <Button
            variant="destructive"
            className="h-14"
            onClick={() => handleAction('rejected')}
          >
            <X className="w-5 h-5" />
            Reject Event
          </Button>
        </div>
      </main>
    </div>
  );
}
