let express = require('express')
let app = express()

let tours = [
    { id: 15042501, name: 'Vịnh Hạ Long', price: 2299770, duration: '1 ngày', rating: 4.5, location: 'Quảng Ninh', maxGroupSize: 15 },
    { id: 15042502, name: 'Phố Cổ Hội An', price: 3448850, duration: '2 ngày', rating: 4.8, location: 'Quảng Nam', maxGroupSize: 12 },
    { id: 15042503, name: 'Sapa', price: 4369770, duration: '3 ngày', rating: 4.9, location: 'Lào Cai', maxGroupSize: 10 },
    { id: 15042504, name: 'Vũng Tàu', price: 2988850, duration: '1 ngày', rating: 4.3, location: 'Bà Rịa - Vũng Tàu', maxGroupSize: 20 },
    { id: 15042505, name: 'Đà Lạt', price: 5979770, duration: '4 ngày', rating: 4.7, location: 'Lâm Đồng', maxGroupSize: 15 },
    { id: 15042506, name: 'Phong Nha - Kẻ Bàng', price: 6898850, duration: '3 ngày', rating: 4.9, location: 'Quảng Bình', maxGroupSize: 12 },
    { id: 15042507, name: 'Nha Trang', price: 5749770, duration: '3 ngày', rating: 4.8, location: 'Khánh Hòa', maxGroupSize: 14 },
    { id: 15042508, name: 'Mũi Né', price: 4598850, duration: '2 ngày', rating: 4.6, location: 'Bình Thuận', maxGroupSize: 12 },
    { id: 15042509, name: 'Cát Bà', price: 4139770, duration: '2 ngày', rating: 4.4, location: 'Hải Phòng', maxGroupSize: 8 },
    { id: 15042510, name: 'Huế', price: 5058850, duration: '3 ngày', rating: 4.7, location: 'Thừa Thiên Huế', maxGroupSize: 10 },
    { id: 15042511, name: 'Đảo Phú Quốc', price: 3679770, duration: '2 ngày', rating: 4.5, location: 'Kiên Giang', maxGroupSize: 15 },
    { id: 15042512, name: 'Chùa Hương', price: 3218850, duration: '1 ngày', rating: 4.6, location: 'Hà Nội', maxGroupSize: 18 },
    { id: 15042513, name: 'Tràng An', price: 4369770, duration: '2 ngày', rating: 4.7, location: 'Ninh Bình', maxGroupSize: 12 },
    { id: 15042514, name: 'Côn Đảo', price: 6438850, duration: '4 ngày', rating: 4.9, location: 'Bà Rịa - Vũng Tàu', maxGroupSize: 10 },
    { id: 15042515, name: 'Hồ Hoàn Kiếm', price: 2989770, duration: '1 ngày', rating: 4.3, location: 'Hà Nội', maxGroupSize: 15 },
    { id: 15042516, name: 'Đảo Lý Sơn', price: 3908850, duration: '2 ngày', rating: 4.6, location: 'Quảng Ngãi', maxGroupSize: 12 },
    { id: 15042517, name: 'Bà Nà Hills', price: 3449770, duration: '1 ngày', rating: 4.4, location: 'Đà Nẵng', maxGroupSize: 14 },
    { id: 15042518, name: 'Đồng Bằng Sông Cửu Long', price: 4598850, duration: '3 ngày', rating: 4.7, location: 'Tiền Giang', maxGroupSize: 16 },
    { id: 15042519, name: 'Vườn Quốc Gia Cúc Phương', price: 5289770, duration: '3 ngày', rating: 4.8, location: 'Ninh Bình', maxGroupSize: 12 },
    { id: 15042520, name: 'Thành Phố Đà Nẵng', price: 4138850, duration: '2 ngày', rating: 4.5, location: 'Đà Nẵng', maxGroupSize: 10 }
]

app.use(express.json());   
app.use(express.urlencoded({ extended: true }));

// GET API: lấy thông tin của tất cả các tour
app.get('/api/tours', (req, res) => {
    if(tours.length === 0)
        return res.status(404).json({success: false, data: 'Danh sách tour đang trống'});

    res.json({ success: true, data: tours });
})

// GET API: lấy thông tin của 1 tour dựa vào id (search)
app.get('/api/tour/:id', (req, res) => {
    let id = parseInt(req.params.id);
    let tour = tours.find(i => i.id === id);

    if(!tour)
        return res.status(404).json({success: false, data: 'Không tìm thấy tour có id là ' + id});
    
    res.json({ success: true, data: tour });
})

// POST API: thêm 1 tour
app.post('/api/tour/add', (req, res) => {
    if(!req.body.name || !req.body.price || !req.body.duration || !req.body.rating || !req.body.location || !req.body.maxGroupSize)
        return res.status(404).json({success: false, data: 'Thông tin tour không đầy đủ'});
    
    let id = 0;
    if(tours.length > 0)
        id = tours[tours.length - 1].id + 1;
    
    let name = req.body.name;
    let price = req.body.price;
    let duration = req.body.duration;
    let rating = req.body.rating;
    let location = req.body.location;
    let maxGroupSize = req.body.maxGroupSize;

    let tour = {
        id: id, 
        name: name, 
        price: price, 
        duration: duration, 
        rating: rating, 
        location: location, 
        maxGroupSize: maxGroupSize
    };

    tours.splice(tours.length, 0, tour); // tính từ vị trí tours.length xóa 0 phần tử và thêm phần tử tour vào

    res.json({ success: true, data: tour })
})

// PUT API: chỉnh sửa 1 tour.
app.put('/api/tour/:id', (req, res) => {
    let id = parseInt(req.params.id) ;
    let tour = tours.find(i => i.id === id)

    if(!tour) 
        return res.status(404).json({ success: false, data: 'Không tìm thấy tour có id là ' + id })

    if(req.body.name) 
        tour.name = req.body.name

    if(req.body.price) 
        tour.price = req.body.price

    if(req.body.duration)
        tour.duration = req.body.duration

    if(req.body.rating)
        tour.rating = req.body.rating

    if(req.body.location)
        tour.location = req.body.location

    if(req.body.maxGroupSize)
        tour.maxGroupSize = req.body.maxGroupSize

    res.json({ success: true, data: tour })
})

// DELETE API: xóa 1 tour. 
app.delete('/api/tour/:id', (req, res) => {
    let id = parseInt(req.params.id) ;
    let tour = tours.find(i => i.id === id)
    let tourIndex = tours.findIndex(i => i.id === id)

    if(tourIndex < 0) 
        return res.json({ success: false, data: 'Không tìm thấy tour có id là ' + id })

    tours.splice(tourIndex, 1) // tính từ vị trí tourIndex loại bỏ 1 phần tử

    res.json({ success: true, data: tour })
})

// Middle ware custom 404 error
app.use((req, res) => {
    res.status(404) 
    res.json({ success: false, data: 'Không tìm thấy trang' })
})

// Middle ware custom 500 error
app.use((err, req, res, next) => {
    console.error(err.message) 
    res.status(500)
    res.json({ success: false, data: 'Lỗi server' })
})

// Tạo server trên cổng 3000
app.listen(3000, () => {
    console.log("Server start trên port 3000");
})
