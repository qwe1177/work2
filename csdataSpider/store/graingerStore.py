"""
author     :LiHuan
date       :3/24/17 6:41 PM
description:
"""
import datetime
from store.redis import MyRedis
from store.mysql import Mysql
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, INTEGER, VARCHAR, TEXT, TIMESTAMP


def getNum(num):
    try:
        return int(num)
    except Exception as e:
        return None


pageMaxKey = "grainger.pageMax.start_urls"
productUrlListkey = "grainger.productUrl.start_urls"


class PageMaxDao(MyRedis):
    def insert(self, value=None):
        pageUrl = value["pageUrl"]
        pageMaxStr = value["pageMax"]
        pageMax = int(pageMaxStr) if getNum(pageMaxStr) else 1
        for pageNo in range(pageMax):
            self.redisServer.lpush(pageMaxKey, pageUrl % (pageNo + 1))


class ProductLinkDao(MyRedis):
    def insert(self, value=None):
        productUrlList = value["productUrlList"]
        if not productUrlList:
            return
        for productUrl in productUrlList:
            self.redisServer.lpush(productUrlListkey, productUrl)


BaseModel = declarative_base()


class ProductInfoDo(BaseModel):
    __tablename__ = 'product_platform_grainger'
    id = Column(INTEGER, primary_key=True, autoincrement=True)
    productId = Column(VARCHAR(200), nullable=False)
    productUrl = Column(VARCHAR(200), nullable=False)
    category = Column(VARCHAR(1000), nullable=False)
    productName = Column(VARCHAR(1000), nullable=False)
    prices = Column(VARCHAR(1000), nullable=False)
    brand = Column(VARCHAR(1000), nullable=False)
    pics = Column(TEXT(1000), nullable=False)
    sku = Column(VARCHAR(10000), nullable=False)
    otherSku = Column(VARCHAR(5000), nullable=False)
    description = Column(TEXT(1000), nullable=False)
    createTime = Column(TIMESTAMP, nullable=False)


class ProductInfoDao(Mysql):
    def insert(self, value=None):
        try:
            productId = value["productUrl"].split("/")[4]
            info = ProductInfoDo(productId=productId, productUrl=value["productUrl"], category=value["category"],
                                 productName=value["productName"], prices=value["prices"], brand=value["brand"],
                                 pics=value["pics"], sku=str(value["sku"]), otherSku=str(value["otherSku"]),
                                 description=value["description"], createTime=datetime.datetime.now())

            self.session.add(info)
            self.session.commit()
        except:
            self.session.rollback()
            raise
        finally:
            self.session.close()