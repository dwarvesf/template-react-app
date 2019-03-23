(ns app.core
  (:require [hx.react :as hx]))

(hx/defnc ^:export MyComponent [props]
  [:h2 props "My ClojureScript React component"])

;; Will be called everytime cljs source files change
(defn ^:dev/after-load render-app []
  (js/renderApp))
