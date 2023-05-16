import { AngularFireAuth } from "@angular/fire/compat/auth"
import { AuthMode } from "./auth.enum"
import { FirebaseAuthService } from "./auth.firebase.service"
import { InMemoryAuthService } from "./auth.inmemory.service"
import { environment } from "src/environments/environment"

export function authFactory(afAuth: AngularFireAuth) {
  switch (environment.authMode) {
    case AuthMode.InMemory:
      return new InMemoryAuthService()
    case AuthMode.Firebase:
      return new FirebaseAuthService(afAuth)
    case AuthMode.CustomServer: throw new Error('Not yet implemented')
  }
}
