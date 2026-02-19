export const totalDuration = (objectData) => {
    // on va calculer le nombre de secondes pour tous les titres
    const totalSeconds = objectData?.songs && objectData?.songs.map(function(titre){
        return parseInt(titre.duration);
    }).reduce(function(a, b){
        return a + b
    }, 0);
    // on va formater les secondes en minutes et heures
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;


    // on retourne la string formate sous la forme 1h15min30s
    return hours > 0
    ? `${hours}h${minutes}min${seconds}s`
    : `${minutes}min${seconds}s`
}