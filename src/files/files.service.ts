import { BadRequestException, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import * as path from 'path';
import { ProductImage } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class FilesService {
	constructor(
		@InjectRepository(ProductImage)
		private readonly imagesRepository: Repository<ProductImage>,
	) {}

	getStaticImage(imageName: string) {
		const image_path = path.join(
			__dirname,
			'..',
			'..',
			'static',
			'products',
			imageName,
		);

		if (!fs.existsSync(image_path)) {
			throw new BadRequestException('Image not found');
		}
		return image_path;
	}

	@Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
	private async clearUnresolvedImages() {
		const productImages = await this.imagesRepository.find({});
		const validImages = productImages.map((pimage) =>
			path.basename(pimage.url),
		);

		const folder = path.join(__dirname, '..', '..', 'static', 'products');
		const unknownImages = fs
			.readdirSync(folder)
			.filter((file) => !validImages.includes(file))
			.filter((file) => !file.startsWith('.'))
			.map((file) => path.join(folder, file));
		for (const image of unknownImages) {
			fs.rmSync(image);
		}
	}
}
