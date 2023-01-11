package com.jalalidate;

import java.util.Date;
import java.util.List;

import com.aigestudio.wheelpicker.WheelPicker;
import com.aigestudio.wheelpicker.WheelPicker.OnWheelChangeListener;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.UIManagerModule;
import com.facebook.react.uimanager.events.Event;
import com.facebook.react.uimanager.events.EventDispatcher;
import com.facebook.react.uimanager.events.RCTEventEmitter;

public class Picker extends WheelPicker {
    private final EventDispatcher mEventDispatcher;
    private List<Object> mValueData;

    public Picker(ReactContext reactContext) {
      super(reactContext);
      mEventDispatcher = reactContext.getNativeModule(UIManagerModule.class).getEventDispatcher();
      setOnWheelChangeListener(new OnWheelChangeListener() {
        @Override
        public void onWheelSelected(int position) {
          if (mValueData != null) {
            mEventDispatcher.dispatchEvent(
              new ItemSelectedEvent(getId(), mValueData.get(position)));
          }
        }

        @Override
        public void onWheelScrolled(int offset) { }

        @Override
        public void onWheelScrollStateChanged(int state) { }
      });
    }

    @Override
    protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
      super.onMeasure(widthMeasureSpec, heightMeasureSpec);
    }

    public void setValueData(List<Object> data) {
      mValueData = data;
    }
}

class ItemSelectedEvent extends Event<ItemSelectedEvent> {

  public static final String EVENT_NAME = "pickerPageSelected";

  private final Object mValue;

  protected ItemSelectedEvent(int viewTag, Object value) {
    super(viewTag);
    mValue = value;
  }

  @Override
  public String getEventName() {
    return EVENT_NAME;
  }

  @Override
  public void dispatch(RCTEventEmitter rctEventEmitter) {
    rctEventEmitter.receiveEvent(getViewTag(), getEventName(), serializeEventData());
  }

  private WritableMap serializeEventData() {
    WritableMap eventData = Arguments.createMap();

    Class mValueClass = mValue.getClass();
    if (mValueClass == Integer.class) {
      eventData.putInt("data", (Integer) mValue);
    } else if (mValueClass == String.class) {
      eventData.putString("data", mValue.toString());
    }

    return eventData;
  }
}
