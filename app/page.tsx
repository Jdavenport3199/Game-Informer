"use client";
import { useRef, useState } from "react";
import Trending from "./components/Trending";
import Upcoming from "./components/Upcoming";
import NewReleases from "./components/NewReleases";
import Image from "next/image";

export default function Home() {
  const [trending, setTrending] = useState<boolean>(true);
  const [newReleases, setNewReleases] = useState<boolean>(false);
  const [upcoming, setUpcoming] = useState<boolean>(false);
  const [selectedGame, setSelectedGame] = useState<{
    id: string;
    name: string;
    image: string;
    releaseDate: string;
    genres: string[];
    platforms: string[];
  } | null>(null);

  const toggleTrending = () => {
    setTrending(true);
    setUpcoming(false);
    setNewReleases(false);
    setSelectedGame(null);
    window.scrollTo(0, 0);
  };

  const toggleNewReleases = () => {
    setTrending(false);
    setUpcoming(false);
    setNewReleases(true);
    setSelectedGame(null);
    window.scrollTo(0, 0);
  };

  const toggleUpcoming = () => {
    setTrending(false);
    setUpcoming(true);
    setNewReleases(false);
    setSelectedGame(null);
    window.scrollTo(0, 0);
  };

  const div = useRef<HTMLDivElement>(null);

  const scrollTo = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main>
      <div
        className="header-holder"
        style={{ display: selectedGame ? "none" : "flex" }}
      >
        <div className="header">
          <h1>Game Informer</h1>
          <h2 className="subheading">
            <i className="fa-solid fa-puzzle-piece fa-lg"></i>&ensp;Stay ahead
            in gaming with the <b>latest releases</b> for all of gaming&apos;s{" "}
            <b>trending and upcoming</b> titles.
          </h2>
          <button
            style={{
              background: "#f5f5f520",
              borderRadius: "100px",
              padding: "1rem 1.8rem 1rem",
              fontSize: "20px",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
            }}
            onClick={() => {
              scrollTo(div);
            }}
          >
            Explore Games&ensp;<i className="fa-solid fa-ghost fa-lg"></i>
          </button>
        </div>
        <Image
          className="splash-img"
          src={"/splash.jpg"}
          width={1920}
          height={920}
          alt=""
        />
      </div>
      <nav>
        <div className="nav-btn-holder">
          <button
            className={trending ? "btn-active" : "none"}
            onClick={() => {
              toggleTrending();
              scrollTo(div);
            }}
          >
            Trending
          </button>
          <button
            className={newReleases ? "btn-active" : "none"}
            onClick={() => {
              toggleNewReleases();
              scrollTo(div);
            }}
          >
            New Releases
          </button>
          <button
            className={upcoming ? "btn-active" : "none"}
            onClick={() => {
              toggleUpcoming();
              scrollTo(div);
            }}
          >
            Upcoming
          </button>
        </div>
      </nav>

      <div ref={div} style={{ paddingTop: "2rem" }}>
        <Trending
          trending={trending}
          selectedGame={selectedGame}
          setSelectedGame={setSelectedGame}
        />
      </div>
      <NewReleases
        newReleases={newReleases}
        selectedGame={selectedGame}
        setSelectedGame={setSelectedGame}
      />
      <Upcoming
        upcoming={upcoming}
        selectedGame={selectedGame}
        setSelectedGame={setSelectedGame}
      />
    </main>
  );
}
