export default class Map {
  constructor(matrix, size) {
    this.size = size;
    this.matrix = matrix;
    this.totalGoldCount = 0;
    this.goldMap = [];
    for (let i=0; i < this.size; i++) {
      this.goldMap[i] = new Array(this.size);
    }
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        if (this.matrix[i][j] == CARDTYPES.GOLD) {
          this.goldMap[i][j] = 1;
          this.totalGoldCount++;
        }
        else {
          this.goldMap[i][j] = 0;
        }
      }
    }
  }

  decreaseGold(id) {
    id = id -1;
    let i = Math.floor(id / this.size);
    let j = id % this.size;
    this.goldMap[i][j]--;
  }

  getGoldOnTitle(id) {
    id = id -1;
    let i = Math.floor(id / this.size);
    let j = id % this.size;
    return this.goldMap[i][j];
  }

  getTotalGoldCount() {
    return this.totalGoldCount;
  }

  getCardType(id) {
    id = id -1;
    let i = Math.floor(id / this.size);
    let j = id % this.size;
    return this.matrix[i][j];
  }

  getMoveableCards(cardID) {
    let res = [];
    if (cardID < 0)
    {
      if (cardID == -1)
      {
        let temp = Math.ceil(this.size/2)
        res = [temp-1, temp, temp+1]
      }
      else if (cardID == -2)
      {
        let temp = this.size*this.size - Math.floor(this.size/2)
        res = [temp-1, temp, temp+1]
      }
    }
    else
    {
      if ((cardID + 1) % this.size != 1)
      {
        res.push(cardID + 1)
      }
      if ((cardID - 1) % this.size != 0)
      {
        res.push(cardID - 1)
      }
      if (cardID - 5 >= 1)
      {
        res.push(cardID - 5)
      }
      if (cardID - 6 >= 1 && (cardID - 6) % this.size != 0)
      {
        res.push(cardID - 6)
      }
      if (cardID - 4 >= 1 && (cardID - 4) % this.size != 1)
      {
        res.push(cardID - 4)
      }
      if (cardID + 5 <= this.size * this.size)
      {
        res.push(cardID + 5)
      }
      if (cardID + 6 <= this.size * this.size  && (cardID + 6) % this.size != 1)
      {
        res.push(cardID + 6)
      }
      if (cardID + 4 <= this.size * this.size  && (cardID + 4) % this.size != 0)
      {
        res.push(cardID + 4)
      }
    }
    return res
  }
  
}