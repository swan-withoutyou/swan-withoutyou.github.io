import type { Fansite } from "@/types/fansite";

/**
 * The two QR images are the owner's originals, copied byte-for-byte.
 * Decoded on 25 Nov 2026 they point to q.me-qr.com short links (a QR redirect service),
 * not to direct Messenger URLs — so messengerInviteUrl stays null until the owner supplies one.
 * Mapping assumption: first supplied image → Fansite 01, second → Fansite 02. Swap paths if reversed.
 */
export const fansites: Fansite[] = [
  {
    id: "swniverse",
    order: 1,
    name: "Swaniverse",
    tagline: "Fansite 01",
    description:
      "Vũ trụ của SWAN — nơi các Cánh con gặp nhau, cùng theo dõi hành trình âm nhạc và ủng hộ chiến dịch Road to 1M.",
    logo: null,
    threadsUrl: null,
    qrImage: "/images/fansites/fansite-01-messenger-qr.png",
    qrAlt: "Mã QR “Cánh con support SWAN” tham gia nhóm Messenger của swniverse",
    messengerInviteUrl: null,
  },
  {
    id: "sap-canh-thien-nga",
    order: 2,
    name: "Sạp Cánh Thiên Nga",
    tagline: "Fansite 02",
    description:
      "Góc nhỏ của những đôi cánh đồng hành cùng SWAN — cập nhật hoạt động, chia sẻ khoảnh khắc và cùng nhau lan toả “Thiếu Nàng”.",
    logo: null,
    threadsUrl: null,
    qrImage: "/images/fansites/fansite-02-messenger-qr.png",
    qrAlt: "Mã QR tham gia nhóm Messenger của Sạp Cánh Thiên Nga",
    messengerInviteUrl: null,
  },
 
];
