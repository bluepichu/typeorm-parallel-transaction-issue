import { EntityManager } from "typeorm";
import { AppDataSource } from "./data-source";
import { Pokemon } from "./entity/Pokemon";

async function insertGen1(tx: EntityManager) {
    const bulbasaur = new Pokemon();
    bulbasaur.name = "Bulbasaur";
    console.log("Saving Bulbasaur...");
    await tx.save(bulbasaur);

    const charmander = new Pokemon();
    charmander.name = "Charmander";
    console.log("Saving Charmander...");
    await tx.save(charmander);

    const squirtle = new Pokemon();
    squirtle.name = "Squirtle";
    console.log("Saving Squirtle...");
    await tx.save(squirtle);
}

async function insertGen2(tx: EntityManager) {
    const chikorita = new Pokemon();
    chikorita.name = "Chikorita";
    console.log("Saving Chikorita...");
    await tx.save(chikorita);

    // Wait, what are the other two again?
    throw new Error("I forgot the other two :(");

    // const cyndaquil = new Pokemon();
    // cyndaquil.name = "Cyndaquil";
    // console.log("Saving Cyndaquil...");
    // await tx.save(cyndaquil);

    // const totodile = new Pokemon();
    // totodile.name = "Totodile";
    // console.log("Saving Totodile...");
    // await tx.save(totodile);
}

AppDataSource.initialize().then(async () => {
    try {
        console.log("Starting transaction...");
        await AppDataSource.transaction(async (tx) => {
            return await Promise.all([
                insertGen1(tx),
                insertGen2(tx),
            ]);
        });
    } catch (error) {
        console.log("Caught error:", error);
        console.log("Transaction should be rolled back");
    }

    console.log("Since the transaction is rolled back, we should not see any Pokemon");
    const pokemon = await AppDataSource.manager.find(Pokemon);
    console.log("But the databse contains:", pokemon);
    console.log("Try running with LOGGING=1 to see why this happened");

    await AppDataSource.destroy();
}).catch(error => console.log(error));

