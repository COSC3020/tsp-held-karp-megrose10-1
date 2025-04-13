# Traveling Salesperson Problem -- Held-Karp Algorithm

This exercise is about the Traveling Salesperson Problem I mentioned in the
lecture on NP-hard problems -- given a set of cities, determine the length of
the shortest tour that visits all of them. We can get from any city to any other
city, i.e. the graph of cities is completely connected. We consider the version
of the Traveling Salesperson Problem that finds the shortest tour to visit $n$
cities, starting at a city and ending at the $n$ th city; it *does not* go
back to the start. The start city may be any of the cities. Remember that the
graph for a TSP is undirected, i.e. the cost is the same in either direction.

The Held-Karp algorithm for solving the Traveling Salesperson Problem is a
recursive algorithm that considers every subset of cities and finds shortest
tours within them. It takes advantage of the fact that every subroute of a route
of minimum length is of minimum length itself. The main idea is that to solve
the problem of finding the shortest route for $n$ cities, we first solve the
problem of finding the shortest route for $n-1$ cities, and then find the
shortest route from the $n-1$st city to the $n$th city. The pseudocode for the
algorithm is as follows:

```javascript
// cities is the set of cities not visited so far, including start
heldKarp(cities, start)
  if |cities| == 2
    return length of tour that starts at start, goes directly to other city in cities
  else
    return the minimum of
      for each city in cities, unless the city is start
        // reduce the set of cities that are unvisited by one  (the old start), set the new start, add on the distance from old start to new start
        heldKarp(cities - start, city) + distance from start to city
```

Implement a dynamic programming version (which could use memoization) of the
Held-Karp algorithm. If you use memoization, make sure that the cache is reset
every time the function is called such that multiple calls do not end up using
old and incorrect values. Start with the template I provided in `code.js`.

The function takes a distance matrix (the adjacency matrix for the graph where
the values in the cells are the distances between the corresponding cities) and
returns the length of the shortest tour (not the tour itself).

Test your new function; I've provided some basic testing code in `code.test.js`.

I looked at lecture notes(including slides), and asked a question in class on what you suggested when
starting this algorithm. I also went to the TA's office hours. Olivia and I talked about 
what the algorithm was asking overall last semester.I also referenced my old dijkstra and 
augmenting paths repositories. I also used the psuedocode when starting on the recursive 
implementation.

I certify that I have listed all sources used to complete this exercise, including the use of any Large Language Models. All of the work is my own, except where stated otherwise. I am aware that plagiarism carries severe penalties and that if plagiarism is suspected, charges may be filed against me without prior notice.

## Runtime Analysis

What is the worst-case asymptotic time complexity of your implementation? What
is the worst-case asymptotic memory complexity? Add your answer, including your
reasoning, to this markdown file.

At the start of the algorithm, we check if the given matrix is filled with zeros, meaning the shortest tour would be 0. We do this using nested loops over all vertices, taking O(v^2) time. Next, we go into another set of nested loops. In these loops, for every start city we go over all possible end cities besides the start which would be O(v^2) (so far). In the inner loop, we call heldKarpTSP which looks at the subsets of the cities. Since each city will be visited or unvisited, the number of subsets will be 2^v. We track this with the current city so, O(2^v *v). We also want to make sure that the order the cities are visited does not matter, so we sort this list, but since the recent change, it will not impact the time complexity significantly.. So this all, excluding constant factors will be O(v^2 + v^3 * 2^v), which simplifies to a worst-case time complexity of O(v^3 * 2^v). While other for loops were not added, this is because the complexity given will grow exponentially, and most of those for loops will not add enough time to significantly affect the overall time complexity. 

Since we are using memoization, we are storing the subsets of cities, which takes up memory. So looking at the important memory takers, the distance matrix given at the beginning will take O(v^2) space. The visited array will take up O(v). The cities list, which will also be O(v), and the memoization object(savedDist) which will take O(2^v *v). This overall will be O(v^2 + v + v + (2^v * v)), which simplifies to O(2^v * v).
