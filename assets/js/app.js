["dragover", "drop"].forEach(function (evt) {
  window.addEventListener(
    evt,
    function (e) {
      e.preventDefault();
    },
    true,
  );
});

let revealObserver;

$(document).ready(function () {
  revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const $el = $(entry.target);
          const index = $el.data("reveal-index") || 0;
          $el.delay(index * 150).animate({ opacity: 1 }, 500);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );
});

$(document).ready(function () {
  const productsContainer = $("#tech-products");

  function renderProducts(products) {
    productsContainer.empty();

    products.forEach(function (product, index) {
      const productName = product.name;
      const productData = product.data || {};

      let details = "";

      for (const [key, value] of Object.entries(productData)) {
        details += `
          <li class="list-group-item d-flex justify-content-between">
            <span class="fw-semibold">${key}: </span>
            <span> ${value}</span>
          </li>
        `;
      }

      if (!details) {
        details = `
          <li class="list-group-item text-muted">
            No additional information available.
          </li>
        `;
      }

      const cardHtml = `
        <div class="col-md-6 col-lg-4">
          <div class="card tech-card h-100">
            <div class="card-body d-flex flex-column">

              <h5 class="card-title">
                ${productName}
              </h5>

              <ul class="list-group list-group-flush mb-3">
                ${details}
              </ul>

              <div class="mt-auto">
                <a href="#" class="tech-link">
                  View <i class="bi bi-arrow-right"></i>
                </a>
              </div>

            </div>
          </div>
        </div>
      `;

      const $card = $(cardHtml).css("opacity", 0);
      $card.data("reveal-index", index % 3);
      productsContainer.append($card);
      revealObserver.observe($card[0]);
    });
  }

  $.ajax({
    url: "https://api.restful-api.dev/objects",
    method: "GET",

    success: function (products) {
      renderProducts(products);
    },

    error: function () {
      productsContainer.html(`
        <div class="col-12">
          <div class="alert alert-warning text-center">
            <i class="bi bi-exclamation-circle me-2"></i>
            We are unable to load products right now. Please try again later.
          </div>
        </div>
      `);
    },
  });
});

$(document).ready(function () {
  $("#programs .card").each(function (index) {
    const $card = $(this).closest(".col-md-4").css("opacity", 0);
    $card.data("reveal-index", index);
    revealObserver.observe($card[0]);
  });

  $("#community .col-12.col-md-4").each(function (index) {
    const $img = $(this).css("opacity", 0);
    $img.data("reveal-index", index);
    revealObserver.observe($img[0]);
  });

  $("#community .card.shadow-sm").each(function () {
    const $card = $(this).css("opacity", 0);
    $card.data("reveal-index", 0);
    revealObserver.observe($card[0]);
  });
});

$(document).ready(function () {
  function resetDropzone() {
    $("#dropzone")
      .removeClass("upload-success upload-error")
      .find("h5")
      .text("Drag & Drop Photo");
    $("#dropzone i")
      .removeClass("bi-check-circle bi-x-circle bi-arrow-repeat")
      .addClass("bi-cloud-arrow-up");
  }

  function pulseDropzone() {
    $("#dropzone").fadeTo(150, 0.6).fadeTo(150, 1);
  }

  $("#dropzone").filedrop({
    fallback_id: "fallback_input",
    fallback_dropzoneClick: false,
    url: "http://localhost:3000/api/upload",
    paramname: "image",
    maxfiles: 1,
    maxfilesize: 10,
    allowedfiletypes: ["image/jpeg", "image/png", "image/webp"],

    dragOver: function () {
      $("#dropzone")
        .removeClass("upload-success upload-error")
        .addClass("dragging");
    },

    dragLeave: function () {
      $("#dropzone").removeClass("dragging");
    },

    drop: function () {
      $("#dropzone").removeClass("dragging");
    },

    uploadStarted: function (i, file, len) {
      $("#dropzone h5").text("Uploading...");
      $("#dropzone i")
        .removeClass("bi-cloud-arrow-up")
        .addClass("bi-arrow-repeat");
    },

    uploadFinished: function (i, file, response) {
      $("#dropzone").addClass("upload-success");
      $("#dropzone h5").text("Upload successful!");
      $("#dropzone i")
        .removeClass("bi-arrow-repeat")
        .addClass("bi-check-circle");

      pulseDropzone();

      setTimeout(resetDropzone, 2500);
    },

    error: function (err, file) {
      $("#dropzone").addClass("upload-error");
      $("#dropzone h5").text("Upload failed. Please try again.");
      $("#dropzone i").removeClass("bi-arrow-repeat").addClass("bi-x-circle");

      pulseDropzone();

      setTimeout(resetDropzone, 2500);
    },
  });

  $(".btn-outline").on("click", function () {
    $("#fallback_input").trigger("click");
  });
});
