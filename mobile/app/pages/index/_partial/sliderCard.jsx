import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';

const CardExampleWithAvatar = () => (
  <Card>
    
    <CardMedia>
      <img src="http://inqua.vn/imgs/banner/banner-sanpham.png" />
    </CardMedia>
    <CardText>
      <p>( Do shop đang trong quá trình phát triển, nên hiện tại chúng tôi chỉ cung cấp các mặt hàng về ly sứ mong các bạn thông cảm, các sản phẩm liên quan đến skin điện thoại, case điện thoại chúng tôi sẽ cung cấp dịch vụ trong thời gian sau. )</p>

      <p><b>Bạn đang tìm kiếm :</b></p>
      <p>Bạn đang muốn lưu trữ các khoảnh khắc đáng nhớ của mình lên các vật dụng hằng ngày như ly sứ, bạn đang có một tấm hình dễ thương trên máy tính và muốn in lên ly sứ, hay bạn đang là chủ một doanh nghiệp muốn có một sản phẩm để tặng khách hàng hay nhân viên. </p>

      <p>Bạn muốn tiết kiệm thời gian thay vì phải ra tiệm in chọn sản phẩm, chọn mẫu thiết kế... Chúng tôi tin tưởng có thể giúp các bạn tiết kiệm thời gian với 3 bước ngay trên website, bạn đã có thể tạo ra một sản phẩm mang tính cá nhân nhanh nhất để gửi tặng cho các đối tác hay người thân yêu của các bạn. </p>

      <p>Ngoài ra chúng tôi còn hỗ trợ sẵn một kho thiết kế mẫu, các bạn có thể tham khảo chỉnh sữa phù hợp với mình. </p>
    </CardText>
    <CardActions>
      <FlatButton label="Bắt đầu ngay" />
      <FlatButton label="Kho thiết kế mẫu" />
    </CardActions>
  </Card>
);

export default CardExampleWithAvatar;