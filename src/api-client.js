const URL = 'https://secure-mesa-25002.herokuapp.com/api';

getLeagues = async () => {
    return await fetch(URL + '/leagues')
        .then(response => response.json());
}

getTeam = async (id) => {
    return await fetch(URL + '/teams/' + id)
        .then(response => response.json());
}

getStadium = async (id) => {
    return await fetch(URL + '/stadiums/' + id)
        .then(response => response.json());
}

login = async (email, pass) => {
    return await fetch(URL + '/users/login/' + email + '/' + pass)
        .then(response => response.json());
}

isParticipantOf = async (user, league) => {
    return await fetch(URL + '/users/belongsToLeague/' + user + '/' + league)
        .then(response => response.json());
}

joinLeague = async (user, league) => {
    return await fetch(URL + '/participants', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            leagueId: league.id,
            userId: user.id,
            authorized: true,
            role: 1,
            teamName: user.name,
            score: 0
        }),
    }).then(response => response.json());
}

predict = async (participant, match, winner, homeCount, awayCount) => {
    return await fetch(URL + '/predictions', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            participantId: participant,
            matchId: match,
            winnerTeam: winner,
            resultTeam1: homeCount,
            resultTeam2: awayCount
        }),
    }).then(response => response.json());
}

export {
    getLeagues,
    getTeam,
    getStadium,
    login,
    isParticipantOf,
    predict,
    joinLeague
}