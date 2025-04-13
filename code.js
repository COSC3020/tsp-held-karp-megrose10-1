function tsp_hk(distance_matrix) {
    let numOfCities = distance_matrix.length;
    let visited = [];
    //let visitedCities = [];
    let shortestTour = Infinity;
    let start = 0;
    //Our memoization to keep track of distances we have calculated
    //let savedDist = {};
    //let end = numOfCities - 1;

    //If there is one city, the distnace is 0
    if(numOfCities <= 1) {
        return 0;
    }

    //Check if the matrix is filled with zeros, so no distances
    let noDistances = true;

    for(let i = 0; i < numOfCities; i++) {
        for(let j = 0; j < numOfCities; j++) {
            if((i != j) && (distance_matrix[i][j] != 0)) {
                noDistances = false;
                break;
            }
        }
        //If there are nodistances, return 0
        if(noDistances) {
            return 0;
        }
    }


    for(start; start < numOfCities; start++) {
        //Set every vertex in visited to false
        for(let i = 0; i < numOfCities; i++) {
            visited[i] = false;
        }

        //Set start vertex to true
        visited[start] = true;

        //Test ending of tour
        for(let end =0; end < numOfCities; end++) {
            if(end != start) {
                //Memoization to track distances
                let savedDist = {};
                let tour = heldKarpTSP(distance_matrix, visited, start, numOfCities, savedDist, end);
                //See if the recently computed tour is less cost than shortestTour, if so change value of shortest tour
                if(tour < shortestTour) {
                    shortestTour = tour;
                }
            } 
        }

    }       

    return shortestTour;

}

function heldKarpTSP(cities, visited, currentCity, numOfCities, savedDist, end) {
    //If a city has been visited, add to visitedCities array
    //for(let i = 0; i < visited.length; i++) {
    //    if(visited[i]) {
    //        visitedCities.push(i);
    //    }
    //}
    //let returnToStart = false;
    //console.log("current city: " + currentCity);

    //Shows whether a city has been visited(true or false) and the current city we are looking at
    //Make sure city order does not matter
    let namesOfVisitedCities = [];
    for(let i = 0; i < visited.length; i++) {
        //If city is visited
        if(visited[i]) {
            //Push index to visited city
            namesOfVisitedCities.push(i);
        }
    }
    //Sort the names of visited cities
    let visitedAndCurrent = namesOfVisitedCities.sort().join(', ') + ' city: ' + currentCity;
    //let visitedAndCurrent = visited.join(', ') + ' city: ' + currentCity;
    //console.log(visitedAndCurrent);

    //If it is not undefined, the distance has been found so return the distance weight
    if(savedDist[visitedAndCurrent] != undefined) {
        return savedDist[visitedAndCurrent];
    }

    //If there is an unvisited city, add to amound of unvisited cities
    let visitedCities = true;
    let numOfUnvisitedCities = 0;
    for(let i = 0; i < numOfCities; i++) {
        if(!visited[i]) {
            visitedCities = false;
            numOfUnvisitedCities++;
            //break;
        }
    }

    //If there is one city left, check if it is the end 
    if(numOfUnvisitedCities == 1){
        // if(visitedCities == true) {
        //     return cities[currentCity][end];
        // }
        //If the end has not been visited, go to end
        if(!visited[end]) {
            return cities[currentCity][end];
        }
    }

    //If all cities have been seen
    if(numOfUnvisitedCities == 0) {
        //If the city we are at is the end
        if(currentCity == end) {
            return 0;
        }
    }



    //Minimum path set to infinity
    let min = Infinity;

    for(let nextCity = 0; nextCity < numOfCities; nextCity++) {
        //If the city has already been visited, if the next city is the end even though
        //there are unvisted cities
        if(visited[nextCity] || ((nextCity == end) && (numOfUnvisitedCities > 1))) {
            continue;
        }
        //Will now be visited
        visited[nextCity] = true;
        //Find distance
        //console.log(cities[currentCity][nextCity]);
        let distanceWeight = cities[currentCity][nextCity] + heldKarpTSP(cities, visited, nextCity, numOfCities, savedDist, end);
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
