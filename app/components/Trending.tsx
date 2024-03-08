"use client";
import { useEffect, useState } from "react";

interface UpcomingProps {
  trending: boolean;
  selectedGame: any;
  setSelectedGame: (game: any) => void;
}

const Trending: React.FC<UpcomingProps> = ({
  trending,
  selectedGame,
  setSelectedGame,
}) => {
  const [gameData, setGameData] = useState<
    Array<{
      id: string;
      name: string;
      image: string;
      releaseDate: string;
      genres: string[];
      platforms: string[];
      rating: string;
    } | null>
  >([]);

  useEffect(() => {
    const oneDay = 24 * 60 * 60 * 1000;

    const fetchData = async () => {
      try {
        let storedGameDataTrending = localStorage.getItem("gameDataTrending");

        const lastUpdated = localStorage.getItem("lastUpdated");

        if (
          !storedGameDataTrending ||
          !lastUpdated ||
          Date.now() - parseInt(lastUpdated) > oneDay
        ) {
          const response = await fetch("/api/trending", {
            method: "POST",
            body: JSON.stringify({}),
          });

          const data = await response.json();

          const dataPassthrough = data.data.results.map((x: any) => {
            const genres = x.genres.map((genre: any) => genre.name);
            const platforms = x.parent_platforms.map(
              (platform: any) => platform.platform.name
            );

            return {
              id: x.id,
              name: x.name,
              image: x.background_image,
              releaseDate: x.released,
              genres: genres,
              platforms: platforms,
              rating: x.rating,
            };
          });
          setGameData(dataPassthrough);
          localStorage.setItem(
            "gameDataTrending",
            JSON.stringify(dataPassthrough)
          );
          localStorage.setItem("lastUpdated", Date.now().toString());
        } else {
          setGameData(JSON.parse(storedGameDataTrending));
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, oneDay);
    return () => clearInterval(interval);
  }, []);

  const PlatformIcon = ({ platform }: any) => {
    switch (platform) {
      case "PC":
        return <i className="fa-brands fa-windows fa-sm"></i>;
      case "Linux":
        return <i className="fa-brands fa-linux fa-sm"></i>;
      case "Apple Macintosh":
        return <i className="fa-brands fa-apple fa-sm"></i>;
      case "Xbox":
        return <i className="fa-brands fa-xbox fa-sm"></i>;
      case "PlayStation":
        return <i className="fa-brands fa-playstation fa-sm"></i>;
      case "Nintendo":
        return <i className="fa-brands fa-neos fa-sm"></i>;
      default:
        return null;
    }
  };

  const formatReleaseDate = (releaseDate: any) => {
    const date = new Date(`${releaseDate} UTC`);

    const months = [
      "Jan",
      "Feb",
      "March",
      "April",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const month = months[date.getUTCMonth()];
    const day = date.getUTCDate();
    const year = date.getUTCFullYear();

    const addOrdinalSuffix = (num: any) => {
      const suffixes = ["th", "st", "nd", "rd"];
      const v = num % 100;
      return num + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
    };

    const formattedDay = addOrdinalSuffix(day);
    return `${month} ${formattedDay}, ${year}`;
  };

  const handleGameDetails = (x: any) => {
    setSelectedGame(x);
  };

  return (
    <>
      <div
        className={
          selectedGame
            ? "card-holder-hide"
            : trending
            ? "card-holder"
            : "card-holder-hide"
        }
      >
        {gameData.map((x, index) => (
          <div
            className="hover"
            key={index}
            // onClick={() => handleGameDetails(x)}
          >
            <div className="leftTop"></div>
            <div className="leftBottom"></div>
            <div className="rightTop"></div>
            <div className="rightBottom"></div>
            <div className="card" key={index}>
              <div className="card-img-holder">
                <img className="card-img" src={x?.image} alt="" />
              </div>
              <div className="card-description-hover">
                <div className="card-description">
                  <div className="card-platform-holder">
                    <div className="card-platforms">
                      {x?.platforms.map((platforms, index) => (
                        <PlatformIcon key={index} platform={platforms} />
                      ))}
                    </div>
                    <div className="card-score">
                      <span style={{ fontWeight: "800" }}>
                        {x!.rating == "0" ? "-" : x!.rating}
                      </span>
                      <span
                        className="card-text"
                        style={{ color: "#f5f5f580" }}
                      >
                        &nbsp;/&nbsp;5
                      </span>
                    </div>
                  </div>
                  <div className="card-title">
                    <span className="title">
                      {x!.name.length > 25
                        ? x!.name.substring(0, 25) + "..."
                        : x!.name}
                    </span>
                    {/* <span className="title">{x?.name}</span> */}
                  </div>
                  <div className="card-details">
                    <span className="card-text">
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "0.4rem",
                        }}
                      >
                        {x?.genres.slice(0, 3).map((genre, index) => (
                          <span
                            key={index}
                            style={{
                              background: "#f5f5f520",
                              borderRadius: "100px",
                              padding: "0.4rem 0.8rem 0.4rem",
                            }}
                          >
                            {genre}
                          </span>
                        ))}
                      </div>
                    </span>
                    <span className="card-text">
                      {formatReleaseDate(x?.releaseDate)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="background-overlay"></div>
      <div
        className="background"
        style={{
          backgroundImage: selectedGame
            ? `url(${selectedGame?.image})`
            : "none",
          // : `url(/background.jpg)`,
        }}
      ></div>
    </>
  );
};
export default Trending;
