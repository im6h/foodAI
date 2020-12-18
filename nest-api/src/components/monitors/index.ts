import { TerminusModule } from '@nestjs/terminus';
import { TerminusOptionsService } from './termius-options.service';

export const TerminusModuleRegister = TerminusModule.forRootAsync({
  useClass: TerminusOptionsService,
});
