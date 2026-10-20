const db = new Dexie("Sistemisasi-Frontend");

(async () => {
  await db.open();
})();
