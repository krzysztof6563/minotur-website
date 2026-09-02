import eventsData from "../data/events.json" with { type: "json" };

const events = eventsData;

const getEventTypeNameAndEmoji = (event) => {
    let name = "";
    let emoji = "";

    switch (event.type) {
        case "rpg":
            name = "RPG";
            emoji = "🎲";
            break;

        case "video-games":
            name = "Gry cyfrowe";
            emoji = "🎮";
            break;

        case "prel":
            name = "Spotkanie";
            emoji = "🗒️";
            break;

        case "larp":
            name = "LARP";
            emoji = "🎭";
            break;
    }

    return {
        name: name,
        emoji: emoji,
    };
};

const parseEventDate = (dateString) => new Date(dateString.replace(" ", "T"));
const formatEventDate = (dateString) => parseEventDate(dateString).toLocaleString();

const upcomingEvents = (() => {
    const now = new Date();
    const filteredEvents = eventsData.filter((event) => {
        const cutoff = parseEventDate(event.date);
        cutoff.setDate(cutoff.getDate() + 1);
        return now < cutoff;
    });

    return filteredEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
})();

export { events, upcomingEvents, getEventTypeNameAndEmoji, parseEventDate, formatEventDate };
