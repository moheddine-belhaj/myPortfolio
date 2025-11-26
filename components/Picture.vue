<template>
  <div class="picture-container">
    <!-- SVG Filter Definition -->
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      class="filter-svg"
    >
      <defs>
        <filter id="picture-filter">
          <feOffset
            in="SourceGraphic"
            operator="atop"
            dx="-18"
            x="0%"
            y="15"
            width="550"
            height="25"
            result="tile1"
            class="slice"
          />
          <feOffset
            in="SourceGraphic"
            operator="atop"
            dx="18"
            x="0"
            y="125"
            width="200"
            height="45"
            result="tile2"
            class="slice"
          />
          <feOffset
            in="SourceGraphic"
            operator="atop"
            dx="228"
            x="0"
            y="225"
            width="300"
            height="45"
            result="tile3"
            class="slice"
          />
          <feComponentTransfer in="tile1" result="transfer1">
            <feFuncR
              type="table"
              tableValues="1 0 0 1 0 0 "
              class="comp_transfer_table"
            />
            <feFuncB
              type="table"
              tableValues="0 0 0 0 0 0"
              class="comp_transfer_table"
            />
            <feFuncG
              type="table"
              tableValues="1 0 0 0 0 0"
              class="comp_transfer_table"
            />
          </feComponentTransfer>
          <feComponentTransfer in="tile2" result="transfer2">
            <feFuncG
              type="gamma"
              amplitude="500"
              exponent="4"
              offset="-10"
              class="gamma"
            />
          </feComponentTransfer>
          <feComponentTransfer in="tile3" result="transfer3">
            <feFuncR type="gamma" amplitude="15" class="gamma" />
            <feFuncG type="gamma" amplitude="35" class="gamma" />
            <feFuncB type="gamma" amplitude="15" class="gamma" />
          </feComponentTransfer>
          <feBlend
            mode="color-dodge"
            in="tile1"
            in2="transfer1"
            result="blended1"
          />
          <feBlend
            mode="color-dodge"
            in="tile2"
            in2="transfer2"
            result="blended2"
          />
          <feBlend
            mode="color-dodge"
            in="tile3"
            in2="transfer3"
            result="blended3"
          />
          <!--start CA effect -->
          <feOffset dx="0" dy="0" in="SourceGraphic" result="offset1" />
          <feOffset dx="0" dy="0" in="SourceGraphic" result="offset2" />
          <feOffset dx="0" dy="0" in="SourceGraphic" result="offset3" />
          <feColorMatrix
            in="offset1"
            values="1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 "
            result="offset_red_channel"
            class="channel red"
          />
          <feColorMatrix
            in="offset2"
            values="0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0 "
            result="offset_green_channel"
            class="channel green"
          />
          <feColorMatrix
            in="offset3"
            values="0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 1 0 "
            result="offset_blue_channel"
            class="channel blue"
          />
          <feBlend
            mode="screen"
            in="offset_red_channel"
            in2="offset_green_channel"
            result="red_green_blend"
          />
          <feBlend
            mode="screen"
            in="offset_blue_channel"
            in2="red_green_blend"
            result="ca_effect"
          />
          <feMerge>
            <feMergeNode in="ca_effect" />
            <feMergeNode in="blended1" />
            <feMergeNode in="blended2" />
            <feMergeNode in="blended3" />
          </feMerge>
        </filter>
      </defs>
    </svg>

    <!-- Profile Picture -->
    <img
      :src="imageSrc"
      :alt="altText"
      class="profile-image"
      ref="profileImage"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';

// Props
const props = defineProps({
  imageSrc: {
    type: String,
    default: '../assets/images/Profile.jpg'
  },
  altText: {
    type: String,
    default: 'Profile Picture'
  },
  width: {
    type: Number,
    default: 400
  },
  height: {
    type: Number,
    default: 400
  }
});

const profileImage = ref(null);
let masterTl = null;

const startAnimation = () => {
  if (!profileImage.value) return;

  const imgElm = profileImage.value;
  const imgSize = { width: props.width, height: props.height };

  masterTl = gsap.timeline();
  const offsets = document.querySelectorAll('feOffset');
  const slices = document.querySelectorAll('.slice');
  const compTransferTables = document.querySelectorAll('.comp_transfer_table');

  // Animate offsets
  offsets.forEach(function (offsetElm) {
    const tl = gsap.timeline({ repeat: -1, repeatRefresh: true }).fromTo(
      offsetElm,
      { attr: { dx: 'random(-5,5)' } },
      {
        attr: { dx: 0 },
        delay: 'random(0.5,0.9)',
        duration: 'random(0.1,0.8)'
      },
      0
    );
    masterTl.add(tl, 0);
  });

  // Animate slices
  slices.forEach(function (sliceElm) {
    const tl = gsap.timeline({ repeat: -1, repeatRefresh: true }).fromTo(
      sliceElm,
      {
        attr: {
          height: `random(${imgSize.height * 0.005}, ${imgSize.height * 0.1})`,
          x: `random(-${imgSize.width}, ${imgSize.width})`,
          y: `random(0, ${imgSize.height})`,
          dx: 'random(-105,105)',
          width: `random(${imgSize.width * 0.1},${imgSize.width * 1.1})`
        }
      },
      {
        attr: {
          width: '100%',
          x: `random(-${imgSize.width}, ${imgSize.width})`
        },
        delay: 'random(0.5,2.5)',
        duration: 'random(0.1,0.5)'
      },
      0
    );
    masterTl.add(tl, 0);
  });

  // Animate component transfer tables
  compTransferTables.forEach(function (funcElm) {
    const tl = gsap.timeline({ repeat: -1, repeatRefresh: true }).fromTo(
      funcElm,
      {
        attr: {
          tableValues:
            'random(-1,1) random(-1,1) random(-1,1) random(-1,1) random(-1,1)'
        }
      },
      { duration: 'random(0.5,1.5)' }
    );
    masterTl.add(tl, 0);
  });
};

const stopAnimation = () => {
  if (masterTl) {
    masterTl.kill();
    masterTl = null;
  }
};

onMounted(() => {
  // Start animation when component is mounted
  startAnimation();
});

onUnmounted(() => {
  // Clean up animation when component is unmounted
  stopAnimation();
});
</script>

<style lang="scss" scoped>
.picture-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background: transparent;
}

.filter-svg {
  position: absolute;
  visibility: hidden;
  width: 0;
  height: 0;
}

.profile-image {
  filter: url(#picture-filter);
  border: 1px solid #fff;
  border-radius: 8px;
  width: v-bind('`${props.width}px`');
  height: v-bind('`${props.height}px`');
  object-fit: cover;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 10px 30px rgba(255, 255, 255, 0.1);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .profile-image {
    width: v-bind('`${Math.min(props.width, 300)}px`');
    height: v-bind('`${Math.min(props.height, 300)}px`');
  }
}

@media (max-width: 480px) {
  .profile-image {
    width: v-bind('`${Math.min(props.width, 250)}px`');
    height: v-bind('`${Math.min(props.height, 250)}px`');
  }
}
</style>
