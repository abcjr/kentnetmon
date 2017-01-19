'use strict';

function generateChartTCP(container, agentId) {
    var request = new XMLHttpRequest();

    request.addEventListener('readystatechange', function () {
        if (this.readyState == 4) {
            var results = JSON.parse(this.responseText).results,
                chart,
                length = results.length;

            for (var i = 0; i < length; i++) {
                results[i] /= 1000000;
            }

            results.unshift('Throughput (Mbps)');

            chart = c3.generate({
                bindto: container,
                data: {
                    columns: [results]
                },
                axis: {
                    x: {
                        label: 'Test No.'
                    },
                    y: {
                        label: {
                            text: 'Throughput (Mbps)',
                            position: 'outer-top'
                        },
                        tick: {
                            format: d3.format('.2f')
                        }
                    }
                }
            });
        }
    });
    request.open('GET', '/graphs/' + agentId, true);
    request.send();
}

window.addEventListener('load', function () {
    var graphContainers = document.querySelectorAll('.graphTCP'),
        i;

    for (i = 0; i < graphContainers.length; i += 1) {
        generateChartTCP(graphContainers[i], graphContainers[i].getAttribute('data-agent-tcp-id')); //Iterate through agents generating a graph for each
    }
});
