import React, { useState } from "react";
import { View, Image, Pressable, StyleSheet, Dimensions } from "react-native";

import Carousel, { Pagination } from "react-native-snap-carousel";

import { Shadow } from "react-native-shadow-2";
import Colors from "../../src/constants/Colors";
import ImageViewerModal from "./ImageViewerModal";

const { width } = Dimensions.get("window");

// const images = [
//   "https://assets.cntraveller.in/photos/66667d71fec9b2e737ab2480/master/w_1600%2Cc_limit/DAG%2520-%2520Caption%2520_Installation%2520shot%2520at%2520DAG%25201_%2520(1).jpg",
//   "https://picsum.photos/700/500",
//   "https://picsum.photos/1000/600",
//   //   "https://picsum.photos/500/600",
//   //   "https://picsum.photos/1000/500",
//   "https://picsum.photos/2500/1500",
// ];

function ImageSlider({images}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [shouldAnimatePagination, setShouldAnimatePagination] = useState(true);

  const renderItem = ({ item, index }) => (
    <View style={styles.imageSliderContainer}>
      <Shadow
        sides={{ bottom: true, top: false, start: false, end: true }}
        corners={{
          topStart: false,
          topEnd: false,
          bottomStart: false,
          bottomEnd: true,
        }}
        offset={[0, 0]}
        distance={6}
        startColor="rgba(0, 0, 0, 0.20)"
        endColor="rgba(0, 0, 0, 0.05)"
      >
        <View style={styles.slide}>
          <Pressable
            onPress={() => {
              setIsModalVisible(true);
              setActiveIndex(index);
              console.log(index);
            }}
          >
            <Image source={{ uri: item }} style={styles.image} />
          </Pressable>
        </View>
      </Shadow>
    </View>
  );

  const handleModalClose = (currentIndex) => {
    setShouldAnimatePagination(false);
    setActiveIndex(currentIndex);
    setIsModalVisible(false);
    setTimeout(() => setShouldAnimatePagination(true), 0.2);
  };
  return (
    <View>
      {images?.length > 0 && (
        <View
          style={[styles.container, { height: images.length > 1 ? 320 : 310 }]}
        >
          <Carousel
            data={images}
            renderItem={renderItem}
            sliderWidth={width}
            itemWidth={380}
            onBeforeSnapToItem={(index) => setActiveIndex(index)}
            firstItem={activeIndex}
          />
          {images?.length > 1 && (
            <View style={styles.paginationContainer}>
              <Pagination
                dotsLength={images.length}
                activeDotIndex={activeIndex}
                dotStyle={styles.dotStyle}
                inactiveDotStyle={styles.inactiveDotStyle}
                inactiveDotScale={0.6}
                animatedDuration={shouldAnimatePagination ? 200 : 0}
                animatedTension={shouldAnimatePagination ? null : 0}
              />
            </View>
          )}
          <ImageViewerModal
            visible={isModalVisible}
            images={images.map((url) => ({ url }))}
            onClose={handleModalClose}
            initialIndex={activeIndex}
          />
        </View>
      )}
    </View>
  );
}

export default ImageSlider;

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    borderRadius: 8,
  },
  slide: {
    overflow: "hidden",
    borderRadius: 8,
  },
  imageSliderContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    resizeMode: "cover",
    height: 280,
    width: 380,
  },
  paginationContainer: {
    position: "absolute",
    bottom: -20,
    alignSelf: "center",
  },
  dotStyle: {
    backgroundColor: Colors.accent.secondary,
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 2,
  },
  inactiveDotStyle: {
    backgroundColor: Colors.gray.dark,
  },
});
