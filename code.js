function tsp_hk(distance_matrix) {
    let numOfCities = distance_matrix.length;
    let visited = [];
    //let visitedCities = [];
    let shortestTour = Infinity;
    let start = 0;
    //Our memoization to keep track of distances we have calculated
    let savedDist = {};

    //Set every vertex in visited to false
    for(let i = 0; i < numOfCities; i++) {
        visited[i] = false;
    }

    //Set start vertex to true
    visited[start] = true;

    //Call heldKarpTSP to find best tour
    shortestTour = heldKarpTSP(distance_matrix, visited, start, numOfCities, savedDist);

    return shortestTour;

}

function heldKarpTSP(cities, visited, currentCity, numOfCities, savedDist) {
    //If a city has been visited, add to visitedCities array
    //for(let i = 0; i < visited.length; i++) {
    //    if(visited[i]) {
    //        visitedCities.push(i);
    //    }
    //}
    //let returnToStart = false;
    //console.log("current city: " + currentCity);

    //Shows whether a city has been visited(true or false) and the current city we are looking at
    let visitedAndCurrent = visited.join(', ') + ' city: ' + currentCity;
    //console.log(visitedAndCurrent);

    //If it is not undefined, the distance has been found so return the distance weight
    if(savedDist[visitedAndCurrent] != undefined) {
        return savedDist[visitedAndCurrent];
    }

    //If there is a city that has not been visited, visitedCities will be false
    //since we have not gone through all cities
    let visitedCities = true;
    for(let i = 0; i < numOfCities; i++) {
        if(!visited[i]) {
            visitedCities = false;
            break;
        }
    }

    //Once all cities have been visited, return to start
    if(visitedCities == true) {
        return cities[currentCity][0];
    } 

    //Minimum path set to infinity
    let min = Infinity;

    for(let nextCity = 0; nextCity < numOfCities; nextCity++) {
        //If the city has not been visited
        if(visited[nextCity]) {
            continue;
        }
        //Will now be visited
        visited[nextCity] = true;
        //Find distance
        //console.log(cities[currentCity][nextCity]);
        let distanceWeight = cities[currentCity][nextCity] + heldKarpTSP(cities, visited, nextCity, numOfCities, savedDist);
        if(min > distanceWeight) {
            min = distanceWeight;
        }
        visited[nextCity] = false;
    }

    //Assign the saved distance the minimum value we found
    savedDist[visitedAndCurrent] = min;
    //console.log(savedDist);

    return min;

}
