const db = new Dexie("Sistemisasi-Frontend");

db.version(1).stores({
  component: "++id, tipe, name", // kolom yang lainnya html, children, listen
});

export function initListPage(data) {
  const tree = $(".list-page");

  const e = $(
    `<a class="list-group-item list-group-item-action" href="#${data.id}"></a>`,
  );

  e.text(data.name);

  tree.append(e);
}

export async function loadComponent() {
  const res = await db.component.where("tipe").equals("page").toArray();

  for (let r of res) {
    initListPage(r);
  }
}

(async () => {
  await db.open();

  loadComponent();

  $(".btn-add-page").on("click", function () {
    const tree = $(".list-page");

    const li = $('<a class="list-group-item" contenteditable="true"></a>');

    tree.append(li);

    li[0].focus();

    li.on("keydown", async function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        let dt = {
          tipe: "page",
          html: "<div></div>",
          name: li.text(),
        };

        const r = await db.component.add(dt);

        dt.id = r;

        initListPage(dt);
        li.remove();
      } else if (e.key === "Escape") {
        e.preventDefault();
        li.remove();
      }
    });
  });
})();
