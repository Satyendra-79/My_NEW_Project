"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/Header";

interface PrayerTimes {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

export default function PrayerTimesPage() {
  const [location, setLocation] = useState("");
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleGetLocation = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation(`${latitude.toFixed(2)}, ${longitude.toFixed(2)}`);
          // Simulated prayer times (in production, use API like Aladhan)
          setPrayerTimes({
            Fajr: "05:30 AM",
            Sunrise: "06:55 AM",
            Dhuhr: "12:45 PM",
            Asr: "04:15 PM",
            Maghrib: "06:35 PM",
            Isha: "08:00 PM",
          });
          setLoading(false);
        },
        () => {
          alert("Unable to get location. Please enable location services.");
          setLoading(false);
        }
      );
    }
  };

  const getCurrentPrayer = () => {
    if (!prayerTimes) return null;
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTimeInMinutes = currentHour * 60 + currentMinute;

    const prayers = [
      { name: "Fajr", time: "05:30", minutes: 5 * 60 + 30 },
      { name: "Sunrise", time: "06:55", minutes: 6 * 60 + 55 },
      { name: "Dhuhr", time: "12:45", minutes: 12 * 60 + 45 },
      { name: "Asr", time: "16:15", minutes: 16 * 60 + 15 },
      { name: "Maghrib", time: "18:35", minutes: 18 * 60 + 35 },
      { name: "Isha", time: "20:00", minutes: 20 * 60 + 0 },
    ];

    for (let i = 0; i < prayers.length; i++) {
      if (currentTimeInMinutes < prayers[i].minutes) {
        return prayers[i].name;
      }
    }
    return "Fajr"; // After Isha, next prayer is Fajr
  };

  const nextPrayer = getCurrentPrayer();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-dark-bg dark:via-dark-surface dark:to-dark-bg">
        <div className="container mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="text-6xl mb-4">🕌</div>
            <h1 className="text-4xl font-bold text-neutral-900 dark:text-dark-text mb-4">
              Prayer Times
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-400">
              Accurate prayer times based on your location
            </p>
          </div>

          {/* Current Time */}
          <div className="max-w-md mx-auto mb-8">
            <div className="card p-6 text-center">
              <div className="text-4xl font-bold text-primary-600 dark:text-primary-400">
                {currentTime.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </div>
              <div className="text-neutral-600 dark:text-neutral-400 mt-2">
                {currentTime.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>
          </div>

          {/* Get Location Button */}
          {!prayerTimes && (
            <div className="max-w-md mx-auto text-center">
              <button
                onClick={handleGetLocation}
                disabled={loading}
                className="w-full btn btn-primary px-8 py-4 text-lg shadow-lg hover:shadow-xl disabled:opacity-50"
              >
                {loading ? "Getting Location..." : "Get Prayer Times for My Location"}
              </button>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-4">
                Click to allow location access and get accurate prayer times
              </p>
            </div>
          )}

          {/* Prayer Times Display */}
          {prayerTimes && (
            <div className="max-w-2xl mx-auto">
              <div className="card p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-neutral-600 dark:text-neutral-400">Location</p>
                    <p className="font-semibold text-neutral-900 dark:text-dark-text">
                      {location}
                    </p>
                  </div>
                  <button
                    onClick={handleGetLocation}
                    className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium text-sm"
                  >
                    Update
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {Object.entries(prayerTimes).map(([prayer, time]) => (
                  <div
                    key={prayer}
                    className={`card p-6 flex items-center justify-between transition-all ${
                      nextPrayer === prayer
                        ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg scale-105"
                        : "hover:shadow-md"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          nextPrayer === prayer
                            ? "bg-white/20"
                            : "bg-primary-100 dark:bg-primary-900/20"
                        }`}
                      >
                        <span className="text-2xl">
                          {prayer === "Fajr" && "🌅"}
                          {prayer === "Sunrise" && "☀️"}
                          {prayer === "Dhuhr" && "🌞"}
                          {prayer === "Asr" && "🌤️"}
                          {prayer === "Maghrib" && "🌆"}
                          {prayer === "Isha" && "🌙"}
                        </span>
                      </div>
                      <div>
                        <h3
                          className={`text-xl font-bold ${
                            nextPrayer === prayer
                              ? "text-white"
                              : "text-neutral-900 dark:text-dark-text"
                          }`}
                        >
                          {prayer}
                        </h3>
                        {nextPrayer === prayer && (
                          <p className="text-sm text-white/90">Next Prayer</p>
                        )}
                      </div>
                    </div>
                    <div
                      className={`text-2xl font-bold ${
                        nextPrayer === prayer
                          ? "text-white"
                          : "text-primary-600 dark:text-primary-400"
                      }`}
                    >
                      {time}
                    </div>
                  </div>
                ))}
              </div>

              {/* Qibla Direction Card */}
              <div className="card p-8 mt-8 text-center">
                <div className="text-5xl mb-4">🧭</div>
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-dark-text mb-2">
                  Qibla Direction
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                  Find the direction to the Holy Kaaba
                </p>
                <a
                  href="/qibla"
                  className="inline-block btn btn-secondary px-6 py-3 shadow-lg hover:shadow-xl"
                >
                  Open Qibla Finder
                </a>
              </div>

              {/* Islamic Date Info */}
              <div className="card p-6 mt-6 text-center">
                <p className="text-neutral-600 dark:text-neutral-400 mb-2">
                  Islamic Date (Approximate)
                </p>
                <p className="text-xl font-semibold text-neutral-900 dark:text-dark-text">
                  8 Sha'ban 1447 AH
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
