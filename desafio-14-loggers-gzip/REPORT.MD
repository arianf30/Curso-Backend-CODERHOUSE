## REPORTE CON ARTILLERY

### Resultado del profiling CON console.log
```
 [Summary]:
   ticks  total  nonlib   name
     34    1.2%    1.3%  JavaScript
   2654   92.9%   98.4%  C++
    105    3.7%    3.9%  GC
    160    5.6%          Shared libraries
      9    0.3%          Unaccounted
```

### Resultado del profiling SIN console.log
```
 [Summary]:
   ticks  total  nonlib   name
     31    1.2%    1.3%  JavaScript
   2422   92.4%   98.3%  C++
    121    4.6%    4.9%  GC
    159    6.1%          Shared libraries
     10    0.4%          Unaccounted
```


## REPORTE CON AUTOCANNON

### Resultado del profiling SIN console.log
```

Running all benchmarks in parallel ...
Running 20s test @ http://localhost:4000/info
100 connections

┌─────────┬────────┬────────┬────────┬────────┬───────────┬──────────┬────────┐
│ Stat    │ 2.5%   │ 50%    │ 97.5%  │ 99%    │ Avg       │ Stdev    │ Max    │
├─────────┼────────┼────────┼────────┼────────┼───────────┼──────────┼────────┤
│ Latency │ 136 ms │ 297 ms │ 514 ms │ 556 ms │ 309.53 ms │ 89.99 ms │ 912 ms │
└─────────┴────────┴────────┴────────┴────────┴───────────┴──────────┴────────┘
┌───────────┬─────────┬─────────┬────────┬────────┬────────┬─────────┬─────────┐
│ Stat      │ 1%      │ 2.5%    │ 50%    │ 97.5%  │ Avg    │ Stdev   │ Min     │
├───────────┼─────────┼─────────┼────────┼────────┼────────┼─────────┼─────────┤
│ Req/Sec   │ 234     │ 234     │ 311    │ 469    │ 321.3  │ 54.05   │ 234     │
├───────────┼─────────┼─────────┼────────┼────────┼────────┼─────────┼─────────┤
│ Bytes/Sec │ 89.2 kB │ 89.2 kB │ 119 kB │ 179 kB │ 122 kB │ 20.6 kB │ 89.2 kB │
└───────────┴─────────┴─────────┴────────┴────────┴────────┴─────────┴─────────┘

Req/Bytes counts sampled once per second.

7k requests in 20.14s, 2.45 MB read
```

### Resultado del profiling CON console.log
```
Running all benchmarks in parallel ...
Running 20s test @ http://localhost:4000/info
100 connections

┌─────────┬────────┬────────┬────────┬────────┬───────────┬──────────┬────────┐
│ Stat    │ 2.5%   │ 50%    │ 97.5%  │ 99%    │ Avg       │ Stdev    │ Max    │
├─────────┼────────┼────────┼────────┼────────┼───────────┼──────────┼────────┤
│ Latency │ 117 ms │ 409 ms │ 782 ms │ 851 ms │ 424.87 ms │ 168.7 ms │ 919 ms │
└─────────┴────────┴────────┴────────┴────────┴───────────┴──────────┴────────┘
┌───────────┬─────────┬─────────┬─────────┬────────┬─────────┬───────┬─────────┐
│ Stat      │ 1%      │ 2.5%    │ 50%     │ 97.5%  │ Avg     │ Stdev │ Min     │
├───────────┼─────────┼─────────┼─────────┼────────┼─────────┼───────┼─────────┤
│ Req/Sec   │ 120     │ 120     │ 204     │ 484    │ 234.4   │ 86.66 │ 120     │
├───────────┼─────────┼─────────┼─────────┼────────┼─────────┼───────┼─────────┤
│ Bytes/Sec │ 45.7 kB │ 45.7 kB │ 77.8 kB │ 184 kB │ 89.3 kB │ 33 kB │ 45.7 kB │
└───────────┴─────────┴─────────┴─────────┴────────┴─────────┴───────┴─────────┘

Req/Bytes counts sampled once per second.

5k requests in 20.11s, 1.79 MB read
```


## REPORTE FLAMEGRAPH

### Resultado CON console.log
![](/graphs/flamegraph_con_log.png)

### Resultado SIN console.log
![](/graphs/flamegraph_sin_log.png)


