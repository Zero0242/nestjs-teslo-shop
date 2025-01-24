import { applyDecorators } from '@nestjs/common';
import { CatchError, LogStyle } from './catch-error.decorator';
import { ReturnLogger } from './return-logger.decorator';

export const Debugger = (type: LogStyle = 'error') => {
	return applyDecorators(ReturnLogger(), CatchError());
};
