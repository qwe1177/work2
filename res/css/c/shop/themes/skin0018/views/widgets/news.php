<div class="box-sub latest-news">
	<div class="bs-hd">
		<h2>商家动态</h2>
		
	</div>				
	<ul>
	<?php if(ShopHelper::XmlCallBack('getArticleList')){?><?php foreach (ShopHelper::XmlCallBack('getArticleList') as $value){?>
		<li><a href="/news/<?php echo CSCHelper::setDefault($value['id']);?>.html" target="_blank"><?php echo CSCHelper::setDefault($value['title']);?></a></li>
		<?php }}?>
	</ul>			
</div>
<div class="g-h-10"></div>