package com.jalalidate;

import android.graphics.Color;

import com.aigestudio.wheelpicker.WheelPicker;

import androidx.annotation.NonNull;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableType;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.PixelUtil;

import java.util.ArrayList;
import java.util.Map;

public class JalaliDateManager extends SimpleViewManager<Picker> {
  public static final String REACT_CLASS = "JalaliDate";

  private static final int DEFAULT_TEXT_SIZE = 24 * 2;
  private static final int DEFAULT_ITEM_SPACE = 16 * 2;

  @Override
  @NonNull
  public String getName() {
    return REACT_CLASS;
  }

  @Override
  public Map getExportedCustomDirectEventTypeConstants() {
    return MapBuilder.of(
      ItemSelectedEvent.EVENT_NAME, MapBuilder.of("registrationName", "onValueChange")
    );
  }

  @Override
  @NonNull
  public Picker createViewInstance(ThemedReactContext reactContext) {
    Picker picker = new Picker(reactContext);
    picker.setItemTextColor(Color.BLACK);
    picker.setItemTextSize(DEFAULT_TEXT_SIZE);
    picker.setSelectedItemTextColor(Color.WHITE);
    picker.setItemSpace(DEFAULT_ITEM_SPACE);
    picker.setIndicator(true);
    picker.setIndicatorSize(2);
    picker.setIndicatorColor(Color.parseColor("#26808080"));
    picker.setCurtain(true);
    picker.setCurtainColor(Color.parseColor("#1A808080"));
    picker.setAtmospheric(true);
    picker.setCurved(true);
    picker.setVisibleItemCount(7);

    picker.setItemAlign(0);

    // Trick Code - wake setSelectItemPosition
    picker.setSelectedItemPosition(1); // Cannot 0 instead of 1, I Don Know why but need this line for make ReactProp selectIndex Work

    return picker;
  }

  @ReactProp(name = "backgroundColor")
  public void setColor(Picker picker, String color) {
    picker.setBackgroundColor(Color.parseColor(color));
  }

  @ReactProp(name="data")
  public void setData(Picker picker, ReadableArray items) {
    if (picker != null) {
      ArrayList<Object> valueData = new ArrayList<>();
      ArrayList<String> labelData = new ArrayList<>();
      for (int i = 0; i < items.size(); i ++) {
        ReadableMap itemMap = items.getMap(i);

        if (itemMap.getType("value") == ReadableType.String) {
          valueData.add(itemMap.getString("value"));
        } else if (itemMap.getType("value") == ReadableType.Number) {
          valueData.add(itemMap.getInt("value"));
        }

        labelData.add(itemMap.getString("label"));
      }
      picker.setValueData(valueData);
      picker.setData(labelData);
    }
  }

  @ReactProp(name="selectedIndex")
  public void setSelectedIndex(Picker picker, int index) {
      if (picker != null) {
        picker.setSelectedItemPosition(index, false);
        picker.invalidate();
      }
  }

  @ReactProp(name="textColor", customType = "Color")
  public void setTextColor(Picker picker, Integer color) {
    if (picker != null) {
      picker.setItemTextColor(color);
    }
  }

  @ReactProp(name="textSize")
  public void setTextSize(Picker picker, int size) {
    if (picker != null) {
      picker.setItemTextSize((int) PixelUtil.toPixelFromDIP(size));
    }
  }

  @ReactProp(name="selectTextColor", customType = "Color")
  public void setSelectedTextColor(Picker picker, Integer color) {
    if (picker != null) {
      picker.setSelectedItemTextColor(color);
    }
  }

  //@ReactProp(name="curtain")
  @ReactProp(name="isShowSelectBackground")
  public void setCurtain(Picker picker, boolean hasCurtain) {
    if (picker != null) {
      picker.setCurtain(hasCurtain);
    }
  }

  //@ReactProp(name="curtainColor", customType = "Color")
  @ReactProp(name="selectBackgroundColor", customType = "Color")
  public void setCurtainColor(Picker picker, Integer color) {
    if (picker != null) {
      picker.setCurtainColor(color);
    }
  }

  // @ReactProp(name="indicator")
  @ReactProp(name="isShowSelectLine")
  public void setIndicator(Picker picker, boolean hasIndicator) {
    if (picker != null) {
      picker.setIndicator(hasIndicator);
    }
  }

  //@ReactProp(name="indicatorColor", customType = "Color")
  @ReactProp(name="selectLineColor", customType = "Color")
  public void setIndicatorColor(Picker picker, Integer color) {
    if (picker != null) {
      picker.setIndicatorColor(color);
    }
  }

  //@ReactProp(name="indicatorSize")
  @ReactProp(name="selectLineSize")
  public void setIndicatorSize(Picker picker, int size) {
    if (picker != null) {
      picker.setIndicatorSize(size);
    }
  }
}
