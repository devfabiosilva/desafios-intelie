import React from 'react';
// @ts-ignore
import { ResponsiveLine } from '@nivo/line';
import './style.css';

const data = [
    {
      "id": "japan",
      "color": "hsl(131, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 58
        },
        {
          "x": "helicopter",
          "y": 157
        },
        {
          "x": "boat",
          "y": 60
        },
        {
          "x": "train",
          "y": 187
        },
        {
          "x": "subway",
          "y": 79
        },
        {
          "x": "bus",
          "y": 128
        },
        {
          "x": "car",
          "y": 19
        },
        {
          "x": "moto",
          "y": 40
        },
        {
          "x": "bicycle",
          "y": 256
        },
        {
          "x": "horse",
          "y": 170
        },
        {
          "x": "skateboard",
          "y": 175
        },
        {
          "x": "others",
          "y": 247
        }
      ]
    },
    {
      "id": "france",
      "color": "hsl(352, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 232
        },
        {
          "x": "helicopter",
          "y": 163
        },
        {
          "x": "boat",
          "y": 76
        },
        {
          "x": "train",
          "y": 144
        },
        {
          "x": "subway",
          "y": 7
        },
        {
          "x": "bus",
          "y": 186
        },
        {
          "x": "car",
          "y": 212
        },
        {
          "x": "moto",
          "y": 37
        },
        {
          "x": "bicycle",
          "y": 54
        },
        {
          "x": "horse",
          "y": 152
        },
        {
          "x": "skateboard",
          "y": 240
        },
        {
          "x": "others",
          "y": 77
        }
      ]
    },
    {
      "id": "us",
      "color": "hsl(289, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 67
        },
        {
          "x": "helicopter",
          "y": 179
        },
        {
          "x": "boat",
          "y": 248
        },
        {
          "x": "train",
          "y": 47
        },
        {
          "x": "subway",
          "y": 29
        },
        {
          "x": "bus",
          "y": 92
        },
        {
          "x": "car",
          "y": 289
        },
        {
          "x": "moto",
          "y": 120
        },
        {
          "x": "bicycle",
          "y": 226
        },
        {
          "x": "horse",
          "y": 154
        },
        {
          "x": "skateboard",
          "y": 203
        },
        {
          "x": "others",
          "y": 239
        }
      ]
    },
    {
      "id": "germany",
      "color": "hsl(50, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 193
        },
        {
          "x": "helicopter",
          "y": 169
        },
        {
          "x": "boat",
          "y": 59
        },
        {
          "x": "train",
          "y": 43
        },
        {
          "x": "subway",
          "y": 234
        },
        {
          "x": "bus",
          "y": 270
        },
        {
          "x": "car",
          "y": 230
        },
        {
          "x": "moto",
          "y": 214
        },
        {
          "x": "bicycle",
          "y": 30
        },
        {
          "x": "horse",
          "y": 114
        },
        {
          "x": "skateboard",
          "y": 34
        },
        {
          "x": "others",
          "y": 7
        }
      ]
    },
    {
      "id": "norway",
      "color": "hsl(159, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 248
        },
        {
          "x": "helicopter",
          "y": 139
        },
        {
          "x": "boat",
          "y": 45
        },
        {
          "x": "train",
          "y": 162
        },
        {
          "x": "subway",
          "y": 15
        },
        {
          "x": "bus",
          "y": 287
        },
        {
          "x": "car",
          "y": 243
        },
        {
          "x": "moto",
          "y": 38
        },
        {
          "x": "bicycle",
          "y": 129
        },
        {
          "x": "horse",
          "y": 85
        },
        {
          "x": "skateboard",
          "y": 0
        },
        {
          "x": "others",
          "y": 285
        }
      ]
    }
  ];

/*
          axisBottom={{
              orient: 'bottom',
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'transportation',
              legendOffset: 36,
              legendPosition: 'middle'
          }}
          axisLeft={{
              orient: 'left',
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'count',
              legendOffset: -40,
              legendPosition: 'middle'
          }}
*/
export default function Graphic(props: any) {
    return (
      <div className="graphic-container">
        <ResponsiveLine
          data={data}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          xScale={{ type: 'point' }}
          yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
              orient: 'bottom',
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
          }}
          axisLeft={{
              orient: 'left',
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
          }}
          colors={{ scheme: 'nivo' }}
          pointSize={10}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabel="y"
          pointLabelYOffset={-12}
          areaOpacity={0.5}
          useMesh={true}
          legends={[
              {
                  anchor: 'bottom-right',
                  direction: 'column',
                  justify: false,
                  translateX: 100,
                  translateY: 0,
                  itemsSpacing: 0,
                  itemDirection: 'left-to-right',
                  itemWidth: 80,
                  itemHeight: 20,
                  itemOpacity: 0.75,
                  symbolSize: 12,
                  symbolShape: 'circle',
                  symbolBorderColor: 'rgba(0, 0, 0, .5)',
                  effects: [
                      {
                          on: 'hover',
                          style: {
                              itemBackground: 'rgba(0, 0, 0, .03)',
                              itemOpacity: 1
                          }
                      }
                  ]
              }
          ]}
        />
      </div>
    );

}
