export default async function handler(req, res) {
    try {
        const response = await fetch(
            `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}`
        );

        if (!response.ok) {
            throw new Error("Failed to fetch NASA APOD");
        }

        const data = await response.json();

        res.status(200).json(data);

    } catch (error) {
        res.status(500).json({
            error: "Failed to load NASA wallpaper"
        });
    }
}