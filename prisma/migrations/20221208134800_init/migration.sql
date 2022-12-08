-- CreateEnum
CREATE TYPE "Color" AS ENUM ('beige', 'white', 'turquoise', 'vinous', 'cyan', 'yellow', 'green', 'brown', 'red', 'mint', 'orange', 'multicoloured', 'pink', 'silver', 'gray', 'blue', 'purple', 'black');

-- CreateEnum
CREATE TYPE "Delivery" AS ENUM ('pochtaru', 'pickup');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('pending', 'paid', 'confirmed', 'sent', 'complected');

-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('default', 'admin');

-- CreateEnum
CREATE TYPE "Type" AS ENUM ('original', 'replica');

-- CreateEnum
CREATE TYPE "Categories" AS ENUM ('sneakers', 'uniform', 'clothes', 'accessories', 'basketballs');

-- CreateEnum
CREATE TYPE "SubCategory" AS ENUM ('everyday', 'basketball', 'shorts', 'shirts', 'pants', 'jackets', 'hoodies');

-- CreateEnum
CREATE TYPE "Brand" AS ENUM ('nike', 'adidas', 'underarmour', 'thenorthface');

-- CreateEnum
CREATE TYPE "SizesClothes" AS ENUM ('s', 'm', 'l', 'xl', 'xxl');

-- CreateEnum
CREATE TYPE "SizesSneakers" AS ENUM ('eu36', 'eu37', 'eu375', 'eu38', 'eu39', 'eu40', 'eu41', 'eu42', 'eu43', 'eu44', 'eu45', 'eu46');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,
    "cusId" TEXT NOT NULL,
    "role" "Roles" NOT NULL DEFAULT 'default',
    "phone_number" INTEGER,
    "bdate" TEXT,
    "first_name" TEXT,
    "last_name" TEXT,
    "avatar_url" VARCHAR(1000),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "result" VARCHAR(250),
    "surname" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "middle" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "home_street" TEXT NOT NULL,
    "home_number" INTEGER NOT NULL,
    "postal_code" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "totalPrice" INTEGER NOT NULL,
    "trackCode" VARCHAR(200),
    "delivery" "Delivery" NOT NULL DEFAULT 'pochtaru',
    "addressId" INTEGER,
    "status" "Status",
    "userId" INTEGER,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Yookassa" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "yookassaId" TEXT,
    "paid" BOOLEAN,
    "payment_method" TEXT,
    "account_id" TEXT,
    "gateway_id" TEXT,
    "orderId" INTEGER,

    CONSTRAINT "Yookassa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductOrder" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "size" TEXT,
    "color" "Color",
    "images" TEXT[],
    "price" INTEGER,
    "count" INTEGER,
    "orderId" INTEGER,
    "productId" INTEGER,

    CONSTRAINT "ProductOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "text" VARCHAR(1000) NOT NULL,
    "userId" INTEGER NOT NULL,
    "orderId" INTEGER,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "category" "Categories" NOT NULL,
    "subcategory" "SubCategory",
    "type" "Type" NOT NULL,
    "brand" "Brand" NOT NULL,
    "title" TEXT NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductChild" (
    "id" SERIAL NOT NULL,
    "sizesClothes" "SizesClothes"[],
    "sizesSneakers" "SizesSneakers"[],
    "color" "Color",
    "productId" INTEGER,

    CONSTRAINT "ProductChild_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "productChildId" INTEGER,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_cusId_key" ON "User"("cusId");

-- CreateIndex
CREATE UNIQUE INDEX "Yookassa_yookassaId_key" ON "Yookassa"("yookassaId");

-- CreateIndex
CREATE UNIQUE INDEX "Yookassa_orderId_key" ON "Yookassa"("orderId");
