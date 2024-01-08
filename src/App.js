import { Card, Image, Input, List, Space, Typography } from "antd";

import './App.css';
import { useEffect, useState } from "react";

function App() {
  const [searchedText, setSearchedText] = useState("");
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);

  useEffect(() => {
    setLoading(true)
// API
    fetch(`https://dummyjson.com/products/search?q=${searchedText}`)
    .then(res => res.json())
    .then(response=>{
      setLoading(false)
      setDataSource(response.products)
    });
  }, [searchedText])

  return (
    <Space style={{padding: "0px 15px"}} direction="vertical">
        <Typography.Title style={{textAlign:"center", fontFamily:"monospace"}}>
          Bubba's Gallery

        </Typography.Title>
        <Input.Search 
              style={
                {
                  maxWidth:500, 
                  display:"flex", 
                  margin:"auto"
                }
              }
              onSearch={(value)=>{
                setSearchedText(value)
              }}>
        </Input.Search>
        <Typography.Text>
          Showing results for: <Typography.Text strong>{searchedText|| "All"}</Typography.Text> 
        </Typography.Text>
        <List 
              loading={loading}
              dataSource={dataSource}
              grid={{xs:1,sm:2,md:3,lg:4,xl:5,xxl:6}}
              renderItem={(item)=>{
                return (
                  <Card
                    key={item.id}
                    hoverable
                    style={{height:400, margin:5, overflow: "hidden"}}>
                      <Image 
                        src={item.thumbnail} preview={{visible: false}}
                        onClick={()=>{
                          setPreviewImages(item.images)
                        }}>

                      </Image>
                  </Card>
                )
              }}
          >

        </List>
        {previewImages.length > 0 ? (
            <Image.PreviewGroup preview={{visible:previewImages.length, onVisibleChange: (value)=>{
              if (!value) {
                setPreviewImages([]);
              }
            }}}>
              {previewImages.map((image) => {
                return <Image src={image} />;
              })}
            </Image.PreviewGroup>
          ) : null
        }
 
    </Space>
   );  
   
}
export default App;
