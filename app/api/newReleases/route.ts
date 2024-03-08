export async function POST(request: Request) {
  try {
    const apiKey = process.env.API_KEY;

    const currentDate = new Date();
    const start = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      currentDate.getDate()
    );
    const startDate = `${start.getFullYear()}-${(start.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${start.getDate().toString().padStart(2, "0")}`;

    const end = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    );
    const endDate = `${end.getFullYear()}-${(end.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${end.getDate().toString().padStart(2, "0")}`;

    const gameKey = await fetch(
      `https://api.rawg.io/api/games?key=${apiKey}&dates=${startDate},${endDate}&ordering=-added&page_size=40`
    );

    const gameData = await gameKey.json();

    return Response.json(
      {
        message: "Eureka!",
        data: gameData,
      },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return Response.json({ message: "error" }, { status: 500 });
  }
}
