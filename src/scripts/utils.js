export const bpmToInterval = (bpm) => {
 const seconds = 60 / bpm
 return seconds * 1000 
}

const getEventFromTouchOrMouse = (event) => event.touches ? event.touches[event.touches.length - 1] : event

export const normalizeEventListener = (func) => {
  return function eventHandler(event) {
    return func(getEventFromTouchOrMouse(event))
  }
}

export const clamp = (min, max, value) => Math.min(Math.max(min, value), max)