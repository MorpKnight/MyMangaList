const homeServices = require('../services/Home.services');

exports.getHomeData = async (req, res) => {
    try {
        const homeData = await homeServices.getHome();
        if (!homeData.data) throw new Error(homeData.message);

        const topResults = homeData.data.topRated;
        const newestResults = homeData.data.newest;

        const response = {
            topMedia: {
                Manga: topResults.filter(item => item.type === 'Manga'),
                Manhwa: topResults.filter(item => item.type === 'Manhwa'),
                Novel: topResults.filter(item => item.type === 'Novel'),
                'Light Novel': topResults.filter(item => item.type === 'Light Novel')
            },
            newestMedia: {
                Manga: newestResults.filter(item => item.type === 'Manga'),
                Manhwa: newestResults.filter(item => item.type === 'Manhwa'),
                Novel: newestResults.filter(item => item.type === 'Novel'),
                'Light Novel': newestResults.filter(item => item.type === 'Light Novel')
            }
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: `Error fetching home data: ${error.message}` });
    }
}

exports.addMedia = async (req, res) => {
    try {
        const response = await homeServices.addMedia(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}