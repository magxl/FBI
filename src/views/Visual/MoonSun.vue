<template>
  <div class="MoonSun Page flexMode hc" :style="MoonSunStyle">
    <div class="Area flexMode hb vc" :style="areaStyle">
      <div
        class="sunArea flexMode hc vc txt-orange1 hover-txt-orange5 backdrop"
        :style="sunStyle"
      >
        <span class="">{{ state.time.time }}</span>
      </div>
      <div
        class="moonArea flexMode hc vc txt-blue1 hover-txt-blue5 backdrop"
        :style="sunStyle"
      >
        <span class="">{{ state.time.time }}</span>
      </div>
    </div>
  </div>
</template>
<script setup>
defineOptions({
  name: 'MoonSun',
});
import { reactive, onMounted, getCurrentInstance, computed } from 'vue';
const state = reactive({
  W: 0,
  H: 0,
  time: {},
  weather: {},
});
const { proxy } = getCurrentInstance();
const areaStyle = computed(() => {
  return {
    width: state.W + 'px',
    height: state.H * 2 + 'px',
    transform: `rotateZ(${rotate.value}deg)`,
  };
});
const sunStyle = computed(() => {
  return {
    transform: `rotateZ(-${rotate.value}deg)`,
  };
});
const skyStyle = computed(() => {
  return;
});
const skyOptions = {
  0: {
    top: 'rgb(0, 0, 0)',
    bottom: 'rgb(0, 20, 60)',
  },
  6: {
    top: 'rgb(43, 107, 155)',
    bottom: 'rgb(103, 78, 31)',
  },
  12: {
    top: 'rgb(85, 182, 255)',
    bottom: 'rgb(240, 181, 72)',
  },
  18: {
    top: 'rgb(43, 107, 155)',
    bottom: 'rgb(103, 78, 31)',
  },
  24: {
    top: 'rgb(0, 0, 0)',
    bottom: 'rgb(0, 20, 60)',
  },
};
const MoonSunStyle = computed(() => {
  const { h } = state.time;
  if (h) {
    const a = [0, 6, 12, 18, 24].map((it) => {
      return {
        k: it,
        v: h - it,
      };
    });
    const minH = a.sort((a, b) => a - b)[0];
    const color = skyOptions[minH.k];
    return {
      backgroundImage: `linear-gradient(to bottom, ${color.top}, ${color.bottom})`,
    };
  } else {
    return {};
  }
});
const rotate = computed(() => {
  //
  const { sunRise, sunSet } = state.weather;
  const riseStamp = +new Date(sunRise);
  const setStamp = +new Date(sunSet);
  const now = state.time.stamp;
  const oneDayRange = setStamp - riseStamp;
  const nowRange = now - riseStamp;
  return (nowRange / oneDayRange) * 180;
});
const getTime = () => {
  state.time = window.$getTime();
};
onMounted(() => {
  state.H = proxy.$el.clientHeight;
  state.W = proxy.$el.clientWidth;
  interTime();
  getWeather();
});
const interTime = () => {
  state.timer = setTimeout(() => {
    getTime();
    interTime();
  }, 1000);
};

const getWeather = async () => {
  const r = await window.$post({
    url: 'http://data.cma.cn/kbweb/home/live',
    showMsg: false,
    data: { lat: '39.8000', lon: '116.4700', type: '1' },
  });
  if (r.result) {
    const {
      sfc,
      condition,
      aqiForecast,
      city,
      aqiHistory,
      limit,
      forecast,
      hourly,
      aqiRank,
      aqiForecastHourly,
      aqiPoint,
      liveIndex,
    } = r.result.data;
    state.weather = condition;
  } else {
    const today = new Date();
    today.setHours(6);
    const sunRise = window.$getFullTime(today);
    today.setHours(18);
    const sunSet = window.$getFullTime(today);
    state.weather = {
      sunRise,
      sunSet,
    };
  }
  // console.table(condition);
};
</script>
<style lang="scss" scoped>
.MoonSun {
  // background-image: linear-gradient(
  //   to top,
  //   rgb(103, 78, 31),
  //   rgb(43, 107, 155)
  // );
}
.Area {
  transition: $trans3;
  .sunArea {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-image: radial-gradient(
      rgba(255, 255, 255, 0.9),
      rgba(255, 255, 255, 0.7)
    );
    box-shadow: 0 0 50px orange, 0 0 15px rgba(255, 166, 0, 0.3) inset;
    animation: sun 8s linear infinite;
  }
  .moonArea {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-image: radial-gradient(
      rgba(255, 255, 255, 0.9),
      rgba(217, 247, 255, 0.5)
    );
    box-shadow: 0 0 50px rgb(217, 247, 255),
      0 0 2px rgba(255, 255, 255, 0.3) inset;
    animation: moon 8s linear infinite;
    color: rgb(29, 102, 248);
  }
}
@keyframes sun {
  0% {
    box-shadow: 0 0 50px orange, 0 0 15px rgba(255, 166, 0, 0.3) inset;
  }
  50% {
    box-shadow: 0 0 150px orange, 0 0 15px rgba(255, 166, 0, 0.3) inset;
  }
  100% {
    box-shadow: 0 0 50px orange, 0 0 15px rgba(255, 166, 0, 0.3) inset;
  }
}
@keyframes moon {
  0% {
    box-shadow: 0 0 50px rgb(217, 247, 255),
      0 0 15px rgba(255, 255, 255, 0.3) inset;
  }
  50% {
    box-shadow: 0 0 150px rgb(217, 247, 255),
      0 0 15px rgba(255, 255, 255, 0.3) inset;
  }
  100% {
    box-shadow: 0 0 50px rgb(217, 247, 255),
      0 0 15px rgba(255, 255, 255, 0.3) inset;
  }
}
</style>
