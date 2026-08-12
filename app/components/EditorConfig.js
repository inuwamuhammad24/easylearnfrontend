import React from "react"
import { Editor } from "@tinymce/tinymce-react"

export default function EditorConfig() {
  return (
    <Editor
      apiKey="7hu3gxd8jeh1buakwjnmrgk50ds2he5metqb5syrzai2lz16"
      init={{
        plugins: "anchor autolink charmap codesample emoticons image link lists media searchreplace wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste ai tableofcontents footnotes mergetags autocorrect typography inlinecss markdown",
        toolbar: "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
        tinycomments_mode: "embedded",
        tinycomments_author: "Inuwa Muhammad",
        mergetags_list: [
          { value: "First.Name", title: "First Name" },
          { value: "Email", title: "Email" },
        ],
        ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
      }}
      initialValue="Type your Essay here!"
    />
  )
}
