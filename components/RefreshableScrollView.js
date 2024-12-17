import React, { useState } from "react";
import { ScrollView, RefreshControl } from "react-native";

const RefreshableScrollView = ({ onRefresh, children, style }) => {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await onRefresh();
    setRefreshing(false);
  };

  return (
    <ScrollView
      contentContainerStyle={style}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
      overScrollMode="never"
    >
      {children}
    </ScrollView>
  );
};

export default RefreshableScrollView;
