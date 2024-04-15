const Product=require('../models/product');

const getAllStaticProducts=async(req,res)=>{
    const products=await Product.find();
    res.json({products,numberProducts:products.length})
}

const getAllProducts=async(req,res)=>{
    let {featured,sort,fields,page,limit,numericFilter}=req.query;
    let queryObject={}
    if(featured)
        queryObject.featured=featured
    if(sort)
        sort=sort.split(",").join(" ")
    if(fields)
        fields=fields.split(",").join(" ")
    page=Number(page)||1
    limit=Number(limit)||10
    skip=(page-1)*limit
    if(numericFilter){
        let operator={
            ">":"$gt",
            ">=":"$gte",
            "=":"$eq",
            "<":"$lt",
            "<=":"$lte"
        }
        let regEx=/\b(<|>|<=|>=|=)\b/g
        let filters=numericFilter.replace(regEx,(result)=>`-${operator[result]}-`)
        const options=["price","rating"]
        filters=filters.split(',').forEach(element => {
            let [field,operator,value]=element.split("-");
            if(options.includes(field))
                queryObject[field]={[operator]:Number(value)}
        });
        
    }
    console.log(queryObject);
    const products=await Product.find(queryObject)
    res.json({products,numberOfProducts:products.length})
}

module.exports={
    getAllProducts,
    getAllStaticProducts
}


//.sort(sort).select(fields).skip(skip).limit(limit)