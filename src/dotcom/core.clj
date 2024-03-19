(ns dotcom.core
  (:require
   [quickblog.internal :as lib]
   [selmer.parser :as selmer]
   [babashka.fs :as fs]
   [pod.babashka.fswatcher :refer [watch]]))

(defn spit-resume [{:keys [out-dir] :as opts}]
  (let [out-file (fs/file out-dir "resume.html")
        opts (-> opts
                 (assoc :watch (format "<script type=\"text/javascript\" src=\"%s\"></script>"
                                       lib/live-reload-script)))
        content (selmer/render (slurp "templates/resume.html") opts)]
    (spit out-file content)))

(defn watch-resume [opts]
  (println "starting watch-resume...")
  (watch "templates"
         (fn [{:keys [path type]}]
           (when (= path "templates/resume.html")
             (println (format "change detected; re-rendering: path: %s type: %s" (str path) (name type)))
             (spit-resume opts))))
  @(promise))
