# Színözön

## Projekt leírása
A **Színözön** egy logikai játék, amely a klasszikus *Mastermind* szabályaira épül. A játék célja, hogy a felhasználó kitalálja a számítógép által véletlenszerűen kiválasztott titkos színkombinációt. A próbálkozások után a játék visszajelzéseket ad fekete és fehér pöttyök formájában, amelyek segítenek közelebb kerülni a megoldáshoz.

---

## Játékszabályok
1. **Titkos kombináció kiválasztása**  
   - A számítógép véletlenszerűen generál egy színkombinációt.  
   - A kombináció 4-5 színből állhat, és ugyanaz a szín többször is szerepelhet.

2. **Próbálkozások**  
   - A játékos minden próbálkozásnál elhelyez egy színkombinációt a táblán.  
   - A visszajelzések alapján megpróbálja egyre pontosabban kitalálni a titkos kombinációt.

3. **Visszajelzések**  
   - **Fekete pötty**: Egy szín helyes **helyen** van.  
   - **Fehér pötty**: Egy szín helytelen helyen van, de szerepel a kombinációban.  
   - A pöttyök nem árulják el, hogy pontosan melyik korongra vonatkoznak.

4. **A játék vége**  
   - A játékos nyer, ha sikerül kitalálnia a titkos kombinációt.  
   - Ha elfogynak a próbálkozások, a titkos kombináció lelepleződik.

---

## Játékmenet
1. A játékos elhelyez egy színkombinációt a táblán.  
2. Az elrendezés megerősítése után a számítógép visszajelzést ad fekete és fehér pöttyök formájában.  
3. A visszajelzések alapján az új próbálkozásokat úgy kell módosítani, hogy közelebb kerüljenek a megoldáshoz:
   - A helyes színeket a megfelelő pozícióban érdemes megtartani.  
   - Azokat a színeket, amelyek rossz helyen vannak, át kell helyezni.  
4. A folyamat addig folytatódik, amíg a titkos kombináció ki nem derül, vagy a próbálkozások el nem fogynak.

---

## Fejlesztési környezet
- **Nyelv**: JavaScript / HTML / CSS  
- **Környezet**: Bármilyen modern böngésző  
- **Szerkesztő**: Visual Studio Code
 
---
