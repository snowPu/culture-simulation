import { bacteriaShopContainer, nutrientsShopContainer, shopContainer } from "../constants/uiElements";
import { CatalogueItem, bacteriaCatalogue, nutrientsCatalogue } from "./Catalogue";
import { BacteriaRecord, BacteriaType, Nutrient, NutrientsRecord } from "./types";

export class Shop {
    bacteriaCart: BacteriaRecord = {
        Ecoli: 0,
        Selongatus: 0
    }
    nutrientsCart: NutrientsRecord = {
        CO2: 0,
        Glucose: 0,
        Oxygen: 0,
        Water: 0,
    }
    callback: (bacteriaCart: BacteriaRecord, nutrientsCart: NutrientsRecord) => void

    constructor(callback: (bacteriaCart: BacteriaRecord, nutrientsCart: NutrientsRecord) => void) {
        this.initShop()
        this.callback = callback
    }

    initShop() {
        this.initCatalogue(bacteriaCatalogue, bacteriaShopContainer, this.bacteriaCart)
        this.initCatalogue(nutrientsCatalogue, nutrientsShopContainer, this.nutrientsCart)
        this.buyButton()
    }

    buy() {
        if (this.cartEmpty(this.bacteriaCart)) {
            alert("No bacteria selected")
        } else if (this.cartEmpty(this.nutrientsCart)) {
            alert("No nutrients selected")
        } else {
            this.callback(this.bacteriaCart, this.nutrientsCart)
        }
    }

    buyButton() {
        const buyButton = document.createElement('button')
        buyButton.className = 'shop-buy'
        buyButton.innerText = 'Start culture'
        buyButton.addEventListener('click', () => {
            this.buy()
        });

        shopContainer.appendChild(buyButton)
    }

    cartEmpty(cart: BacteriaRecord | NutrientsRecord) {
        return Object.values(cart).reduce((val, acc) => acc + val) == 0
    }

    initCatalogue(
        catalogue: CatalogueItem<BacteriaType | Nutrient>[],
        shopContainer: HTMLElement,
        cart: BacteriaRecord | NutrientsRecord
    ) {
        catalogue.forEach(catalogueItem => {
            const shopItem = document.createElement('div')
            shopItem.className = 'shop-item'
            shopItem.id = `item-${catalogueItem.name.toLocaleLowerCase()}`

            const itemDescription = document.createElement('div')
            itemDescription.className = 'item-description'

            const itemImage = document.createElement('img')
            itemImage.src = catalogueItem.image
            itemImage.className = 'item-image'

            const itemLabel = document.createElement('span')
            itemLabel.className = 'item-label'
            itemLabel.innerHTML = catalogueItem.name

            itemDescription.appendChild(itemImage)
            itemDescription.appendChild(itemLabel)

            const numberContainer = document.createElement('div')
            numberContainer.className = 'number-container'

            const minus = document.createElement('button')
            minus.innerText = '-'

            const itemCount = document.createElement('div')
            itemCount.className = 'item-count'
            itemCount.id = `count-${catalogueItem.name.toLocaleLowerCase()}`

            const plus = document.createElement('button')
            plus.innerText = '+'

            plus.addEventListener('click', () => {
                if (Number(itemCount.innerText) < catalogueItem.max) {
                  itemCount.innerText = String(Number(itemCount.innerText) + catalogueItem.step);
                }
                this.updateCartValue(cart, catalogueItem.name, Number(itemCount.innerText))
              });
          
            minus.addEventListener('click', () => {
                if (Number(itemCount.innerText) > catalogueItem.min) {
                  itemCount.innerText = String(Number(itemCount.innerText) - catalogueItem.step);
                }
                this.updateCartValue(cart, catalogueItem.name, Number(itemCount.innerText))
            });

            numberContainer.appendChild(plus)
            numberContainer.appendChild(itemCount)
            numberContainer.appendChild(minus)

            shopItem.appendChild(itemDescription)
            shopItem.appendChild(numberContainer)

            shopContainer.appendChild(shopItem)
        })
    }

    updateCartValue(
        cart: BacteriaRecord | NutrientsRecord,
        name: string,
        value: number
    ): void {
        if (name in cart) {
            (cart as { [key: string]: number })[name] = value;
        }
    }
}