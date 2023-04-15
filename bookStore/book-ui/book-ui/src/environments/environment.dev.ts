export const environment = {
    production: false,
    BASE_URL: "http://localhost:3000",
    BOOK_BASE_URL: "http://localhost:3000/book/",
    USER_BASE_URL: "http://localhost:3000/user/",
    CART_BASE_URL: "http://localhost:3000/cart/",
    BOOK:{
        GET_ALL_BOOKS: "list",
        GET_BOOK: "view?bookId=",
        GET_TRENDING_BOOKS: "listTrending",
        ADD_BOOK: "add",
        UPDATE_BOOK: "update",
        DELETE_BOOK: "delete?bookId=",
        SEARCH_BOOK: "search?id="
    }, 
    USER:{
        GET_ALL_USER: "list",
        ADD_USER: "add",
        GET_USER: "view?userId=",
        UPDATE_USER: "update",
        DELETE_USER: "delete",
        SEARCH_USER: "search?id="
    },
    CART:{
        REG_CART: "regCart",
        ADD_TO_CART: "addItem",
        VIEW_CART: "viewCart?email=",
        DELETE_ITEM: "delete",
        DELETE_CART: "deleteCart"
    }
}

//call "BOOK.BASE_URL.GET_ALL_BOOKS "