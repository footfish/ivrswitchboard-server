export const switchboard = [
    {
      "id": "7021a27d04454b5fa817a2c391bff69e",
      "number": "084412314556",
      "routeOption": "scheduled",
      "schedule": {
        "openHours": {
          "mon": {
            "active": true,
            "begin": "10:00",
            "end": "17:00"
          },
          "tue": {
            "active": true,
            "begin": "11:00",
            "end": "17:00"
          },
          "wed": {
            "active": true,
            "begin": "11:00",
            "end": "17:00"
          },
          "thu": {
            "active": true,
            "begin": "09:00",
            "end": "18:00"
          },
          "fri": {
            "active": true,
            "begin": "09:00",
            "end": "13:00"
          },
          "sat": {
            "active": false,
            "begin": "09:00",
            "end": "17:00"
          },
          "sun": {
            "active": false,
            "begin": "09:00",
            "end": "17:00"
          }
        },
        "lunchHours": {
          "mon": {
            "active": true,
            "begin": "13:00",
            "end": "14:00",
            "hidden": false
          },
          "tue": {
            "active": true,
            "begin": "13:00",
            "end": "14:00",
            "hidden": false
          },
          "wed": {
            "active": true,
            "begin": "13:00",
            "end": "14:00",
            "hidden": false
          },
          "thu": {
            "active": true,
            "begin": "13:00",
            "end": "14:00",
            "hidden": false
          },
          "fri": {
            "active": false,
            "begin": "13:00",
            "end": "13:00",
            "hidden": false
          },
          "sat": {
            "active": false,
            "begin": "09:00",
            "end": "17:00",
            "hidden": true
          },
          "sun": {
            "active": false,
            "begin": "09:00",
            "end": "17:00",
            "hidden": true
          }
        }
      },
      "openMenu": {
        "menu": {
          "0": [
            {
              "action": "playRecording",
              "recordingId": 0
            },
            {
              "action": "forwardToNumber",
              "number": "086123456",
              "ringTimer": 30
            },
            {
              "action": "forwardToNumberWhisper",
              "number": "086123457",
              "ringTimer": 30
            },
            {
              "action": "forwardToNumberConfirm",
              "number": "086123458",
              "ringTimer": 30
            },
            {
              "action": "voicemailToEmail",
              "email": "myaddress@email.com",
              "label": ""
            }
          ],
          "1": [
            {
              "action": "playRecording",
              "recordingId": 0
            },
            {
              "action": "notifyEmail",
              "email": "myaddress@email.com",
              "label": "pressed_1"
            },
            {
              "action": "analytics",
              "label": "pressed_1"
            },
            {
              "action": "backToMenu"
            }
          ],
          "none": [
            {
              "action": "playRecording",
              "recordingId": 0
            },
            {
              "action": "backToMenu"
            }
          ]
        },
        "emailNotification": true,
        "greeting": {
          "recordingId": "0",
          "times": "3"
        }
      },
      "closedMenu": {
        "menu": {
          "none": [
            {
              "action": "voicemailToEmail",
              "email": "closed@email.com",
              "label": ""
            }
          ]
        },
        "emailNotification": false,
        "greeting": {
          "recordingId": "0",
          "times": "1"
        }
      },
      "recordings": [
        {
          "label": "Recording 1",
          "src": "http://cdn.mos.musicradar.com/audio/samples/dubstep-demo-loops/DS_Fizzer140C-05.mp3"
        },
        {
          "label": "Recording 2",
          "src": "http://cdn.mos.musicradar.com/audio/samples/dubstep-demo-loops/DS_BeatF145-01.mp3"
        },
        {
          "label": "Recording 3",
          "src": "http://cdn.mos.musicradar.com/audio/samples/dubstep-demo-loops/DS_DubPad145G-01.mp3"
        }
      ]
    }
  ]