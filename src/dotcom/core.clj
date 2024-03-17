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
  (spit-resume opts)
  (watch "templates/resume.html"
         (fn [{:keys [path type]}]
           (println "resume change detected; re-rendering"
                    (name type) (str path))
           (spit-resume opts)))
  @(promise)
  nil)
