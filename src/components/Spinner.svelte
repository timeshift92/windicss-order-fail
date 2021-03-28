<style>
  .spinner_container {
    width: auto;
    height: 100%;
    overflow: hidden;
    display: flex;
  }
  .spinner_widget {
    width: 120px;
    margin: auto;
    /* margin-top: 35%; */
  }

  :root {
    --animation-delay: 0.125s;
    --animation-duration: 1.5s;
  }

  @-webkit-keyframes animate-svg-fill-1 {
    0% {
      fill: rgba(0, 0, 0, 0.15);
    }

    100% {
      fill: rgb(0, 0, 0);
    }
  }

  @keyframes animate-svg-fill-1 {
    0% {
      fill: rgba(0, 0, 0, 0.15);
    }

    100% {
      fill: rgb(0, 0, 0);
    }
  }

  .svg-elem-1 {
    -webkit-animation: animate-svg-fill-1 var(--animation-duration)
      cubic-bezier(0.95, 0.05, 0.795, 0.035) var(--animation-delay) infinite;
    animation: animate-svg-fill-1 var(--animation-duration)
      cubic-bezier(0.95, 0.05, 0.795, 0.035) var(--animation-delay) infinite;
  }

  @-webkit-keyframes animate-svg-fill-2 {
    0% {
      fill: rgba(33, 161, 254, 0.15);
    }

    100% {
      fill: rgb(33, 161, 254);
    }
  }

  @keyframes animate-svg-fill-2 {
    0% {
      fill: rgba(33, 161, 254, 0.15);
    }

    100% {
      fill: rgb(33, 161, 254);
    }
  }

  .svg-elem-2 {
    -webkit-animation: animate-svg-fill-2 var(--animation-duration)
      cubic-bezier(0.95, 0.05, 0.795, 0.035) 0.23500000000000001s infinite;
    animation: animate-svg-fill-2 var(--animation-duration)
      cubic-bezier(0.95, 0.05, 0.795, 0.035) 0.23500000000000001s infinite;
  }

  @-webkit-keyframes animate-svg-fill-3 {
    0% {
      fill: rgba(33, 161, 254, 0.15);
    }

    100% {
      fill: rgb(33, 161, 254);
    }
  }

  @keyframes animate-svg-fill-3 {
    0% {
      fill: rgba(33, 161, 254, 0.15);
    }

    100% {
      fill: rgb(33, 161, 254);
    }
  }

  .svg-elem-3 {
    -webkit-animation: animate-svg-fill-3 var(--animation-duration)
      cubic-bezier(0.95, 0.05, 0.795, 0.035) 0.335s infinite;
    animation: animate-svg-fill-3 var(--animation-duration)
      cubic-bezier(0.95, 0.05, 0.795, 0.035) 0.335s infinite;
  }

  @-webkit-keyframes animate-svg-fill-4 {
    0% {
      fill: rgba(33, 161, 254, 0.15);
    }

    100% {
      fill: rgb(33, 161, 254);
    }
  }

  @keyframes animate-svg-fill-4 {
    0% {
      fill: rgba(33, 161, 254, 0.15);
    }

    100% {
      fill: rgb(33, 161, 254);
    }
  }

  .svg-elem-4 {
    -webkit-animation: animate-svg-fill-4 var(--animation-duration)
      cubic-bezier(0.95, 0.05, 0.795, 0.035) 0.43500000000000005s infinite;
    animation: animate-svg-fill-4 var(--animation-duration)
      cubic-bezier(0.95, 0.05, 0.795, 0.035) 0.43500000000000005s infinite;
  }

  @-webkit-keyframes animate-svg-fill-5 {
    0% {
      fill: rgba(33, 161, 254, 0.15);
    }

    100% {
      fill: rgb(33, 161, 254);
    }
  }

  @keyframes animate-svg-fill-5 {
    0% {
      fill: rgba(33, 161, 254, 0.15);
    }

    100% {
      fill: rgb(33, 161, 254);
    }
  }

  .svg-elem-5 {
    -webkit-animation: animate-svg-fill-5 var(--animation-duration)
      cubic-bezier(0.95, 0.05, 0.795, 0.035) 0.535s infinite;
    animation: animate-svg-fill-5 var(--animation-duration)
      cubic-bezier(0.95, 0.05, 0.795, 0.035) 0.535s infinite;
  }

  @-webkit-keyframes animate-svg-fill-6 {
    0% {
      fill: rgba(33, 161, 254, 0.15);
    }

    100% {
      fill: rgb(33, 161, 254);
    }
  }

  @keyframes animate-svg-fill-6 {
    0% {
      fill: rgba(33, 161, 254, 0.15);
    }

    100% {
      fill: rgb(33, 161, 254);
    }
  }

  .svg-elem-6 {
    -webkit-animation: animate-svg-fill-6 var(--animation-duration)
      cubic-bezier(0.95, 0.05, 0.795, 0.035) 0.635s infinite;
    animation: animate-svg-fill-6 var(--animation-duration)
      cubic-bezier(0.95, 0.05, 0.795, 0.035) 0.635s infinite;
  }

  @-webkit-keyframes animate-svg-fill-7 {
    0% {
      fill: rgba(33, 161, 254, 0.15);
    }

    100% {
      fill: rgb(33, 161, 254);
    }
  }

  @keyframes animate-svg-fill-7 {
    0% {
      fill: rgba(33, 161, 254, 0.15);
    }

    100% {
      fill: rgb(33, 161, 254);
    }
  }

  .svg-elem-7 {
    -webkit-animation: animate-svg-fill-7 var(--animation-duration)
      cubic-bezier(0.95, 0.05, 0.795, 0.035) 0.7350000000000001s infinite;
    animation: animate-svg-fill-7 var(--animation-duration)
      cubic-bezier(0.95, 0.05, 0.795, 0.035) 0.7350000000000001s infinite;
  }
</style>

<div class="spinner_container">
  <div id="animation" class="spinner_widget">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1060"
      height="100%"
      viewBox="0 0 1060 1500"
      preserveAspectRatio="xMidYMid meet"
      style="width: 100%; height: 100%;">
      <defs>
        <clipPath id="animationMask_Z63TGrJaCx">
          <rect width="1060" height="1500" x="0" y="0" class="svg-elem-1" />
        </clipPath>
      </defs>
      <g clip-path="url(#animationMask_Z63TGrJaCx)">
        <g
          transform="matrix(1,0,0,1,131,351)"
          opacity="1"
          style="user-select: none;">

          <g opacity="1" transform="matrix(1,0,0,1,39.346,399)">
            <path
              fill="rgb(33,161,254)"
              fill-opacity="1"
              d=" M-39.346,89.775 C10.529000000000003,76.47500000000001
              39.346000000000004,24.383 26.046,-24.383
              C17.179,-56.525000000000006 -7.2039999999999935,-80.908
              -39.346,-89.775 C10.529000000000003,-53.2 20.504,16.625
              -16.071,66.5 C-22.721000000000004,75.367
              -30.478999999999996,83.125 -39.346,89.775z"
              class="svg-elem-2" />
          </g>
        </g>
        <g
          transform="matrix(1,0,0,1,131,351)"
          opacity="1"
          style="user-select: none;">
          <g opacity="1" transform="matrix(1,0,0,1,94.756,399.554)">
            <path
              fill="rgb(33,161,254)"
              fill-opacity="1"
              d=" M78.138,1.662 C79.24600000000001,-73.705
              18.288000000000004,-136.879 -57.079,-137.987 C-57.079,-137.987
              -61.512,-137.987 -61.512,-137.987 C-67.054,-137.987
              -72.595,-137.988 -79.245,-136.88 C-3.879000000000005,-128.013
              50.43000000000001,-60.405 41.563,14.962 C34.913000000000004,79.245
              -16.070000000000007,129.12 -79.245,135.77
              C-73.70400000000001,136.87900000000002 -68.162,136.879
              -61.512,136.879 C14.962999999999994,137.987
              77.03,77.02900000000001 78.138,1.662z"
              class="svg-elem-3" />
          </g>
        </g>
        <g
          transform="matrix(1,0,0,1,131,351)"
          opacity="1"
          style="user-select: none;">
          <g opacity="1" transform="matrix(1,0,0,1,180.105,400.109)">
            <path
              fill="rgb(33,161,254)"
              fill-opacity="1"
              d=" M122.471,2.216 C124.688,-117.48400000000001
              29.37100000000001,-216.125 -90.329,-218.342 C-90.329,-218.342
              -98.087,-218.342 -98.087,-218.342 C-106.95400000000001,-218.342
              -115.82,-217.234 -124.687,-217.234 C-6.094999999999999,-203.934
              80.355,-97.534 67.055,22.166
              C55.971000000000004,123.02499999999999 -23.828999999999994,202.825
              -124.687,213.908 C-115.82,215.017 -106.95400000000001,215.017
              -98.087,215.017 C21.613,218.34199999999998
              120.254,123.02499999999999 122.471,2.216z"
              class="svg-elem-4" />
          </g>
        </g>
        <g
          transform="matrix(1,0,0,1,131,351)"
          opacity="1"
          style="user-select: none;">
          <g opacity="1" transform="matrix(1,0,0,1,280.411,399.554)">
            <path
              fill="rgb(33,161,254)"
              fill-opacity="1"
              d=" M164.034,-0.554 C164.034,-161.263 33.25,-292.046
              -127.458,-292.046 C-139.65,-292.046 -151.84099999999998,-290.938
              -164.033,-289.829 C-4.432999999999993,-272.096 110.833,-128.013
              93.1,32.696 C77.583,167.912 -28.815999999999974,274.312
              -164.033,289.829 C-151.84099999999998,290.937 -139.65,292.046
              -127.458,292.046 C33.25,290.937 164.034,160.154 164.034,-0.554z"
              class="svg-elem-5" />
          </g>
        </g>
        <g
          transform="matrix(1,0,0,1,131,351)"
          opacity="1"
          style="user-select: none;">
          <g opacity="1" transform="matrix(1,0,0,1,411.192,400.108)">
            <path
              fill="rgb(33,161,254)"
              fill-opacity="1"
              d=" M201.717,3.326 C203.93300000000002,-193.958
              46.55000000000001,-355.774 -149.625,-357.991 C-149.625,-357.991
              -159.6,-357.991 -159.6,-357.991 C-174.00799999999998,-357.991
              -189.525,-356.88399999999996 -203.933,-355.775
              C-8.86699999999999,-333.609 131.892,-157.383 110.833,37.684
              C91.99199999999999,202.826 -37.68299999999999,333.608
              -203.933,352.45 C-189.525,354.666 -174.00799999999998,354.667
              -159.6,354.667 C37.68299999999999,357.99199999999996
              199.5,200.60899999999998 201.717,3.326z"
              class="svg-elem-6" />
          </g>
        </g>
        <g
          transform="matrix(1,0,0,1,131,351)"
          opacity="1"
          style="user-select: none;">
          <g opacity="1" transform="matrix(1,0,0,1,569.125,399)">
            <path
              fill="rgb(33,161,254)"
              fill-opacity="1"
              d=" M-174.563,-399 C-191.189,-399 -207.813,-397.892
              -224.438,-395.675 C-6.09699999999998,-371.29200000000003
              151.288,-174.008 126.904,44.333 C105.846,229.425
              -39.34699999999998,374.617 -224.438,395.675 C-207.813,397.892
              -191.189,399 -174.563,399 C45.995000000000005,399 224.438,220.558
              224.438,0 C224.438,-220.558 45.995000000000005,-399 -174.563,-399z"
              class="svg-elem-7" />
          </g>
        </g>
      </g>
    </svg>
  </div>
</div>
