import admin, { credential, ServiceAccount } from "firebase-admin";
import { BatchResponse } from "firebase-admin/lib/messaging/messaging-api";

type TFirebaseAdmin = typeof import("firebase-admin");

interface FirebaseAdminOptions {
    projectId: string;
    privateKey: string;
    clientEmail: string;
    databaseURL: string;
}

export class FirebaseAdmin {
    private static instance?: FirebaseAdmin;
    private admin: TFirebaseAdmin;

    private constructor(firebaseAdmin: TFirebaseAdmin) {
        this.admin = firebaseAdmin;
    }

    static initialize(options: FirebaseAdminOptions): void {
        if (this.instance) throw new Error("Instance already initialized.");

        const { projectId, privateKey, clientEmail, databaseURL } = options;
        const serviceAccount: ServiceAccount = {
            projectId,
            privateKey,
            clientEmail,
        };

        const adminConfig = {
            credential: credential.cert(serviceAccount),
            databaseURL,
        };

        admin.initializeApp(adminConfig);
        this.instance = new FirebaseAdmin(admin);
    }

    static getInstance(): FirebaseAdmin {
        if (!this.instance)
            throw new Error("Instance needs to be initialized first.");

        return this.instance;
    }

    sendMulticastMessaging(
        tokens: string[],
        title: string,
        body: string,
        data?: Record<string, string>
    ): Promise<BatchResponse> {
        return this.admin.messaging().sendMulticast({
            data,
            notification: { title, body },
            tokens,
        });
    }
}
