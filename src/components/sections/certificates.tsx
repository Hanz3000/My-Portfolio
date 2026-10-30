"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";

import certificates, { type Certificate } from "@/data/certificates";
import SectionWrapper from "../ui/section-wrapper";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeader } from "./section-header";

const CertificatesSection = () => (
  <SectionWrapper
    id="certificates"
    className="mx-auto max-w-7xl px-4 py-20"
  >
    <SectionHeader
      id="certificates"
      title="Certificates"
      desc="Professional certifications and credentials."
      className="mb-12 md:mb-20 mt-0"
    />

    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {certificates.map((certificate, index) => (
        <CertificateCard
          key={certificate.id}
          certificate={certificate}
          index={index}
        />
      ))}
    </div>
  </SectionWrapper>
);

const CertificateCard = ({
  certificate,
  index,
}: {
  certificate: Certificate;
  index: number;
}) => {
  const [imageUnavailable, setImageUnavailable] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <Card className="group overflow-hidden border-border bg-card text-card-foreground shadow-sm transition-colors duration-300 hover:border-primary/20 hover:shadow-md">
        <div className="relative flex aspect-[1.4/1] items-center justify-center overflow-hidden bg-secondary/40 p-4">
          {!imageUnavailable ? (
            <Image
              src={certificate.image}
              alt={`${certificate.title} certificate`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain p-3"
              onError={() => setImageUnavailable(true)}
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-background/70 p-6 text-center">
              <span className="text-sm font-semibold text-foreground">
                {certificate.title}
              </span>
              <span className="text-xs text-muted-foreground">
                Tambahkan file gambar sertifikat ke folder
                <br />
                <code className="break-all">{certificate.image}</code>
              </span>
            </div>
          )}
        </div>

        <CardContent className="space-y-3 p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-lg font-bold tracking-tight">
                {certificate.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {certificate.publisher}
              </p>
            </div>
            <time className="shrink-0 rounded-full border border-border px-3 py-1 font-mono text-xs text-muted-foreground">
              {certificate.date}
            </time>
          </div>

          <p className="text-sm leading-relaxed text-muted-foreground">
            {certificate.description}
          </p>

          {certificate.link && (
            <Link
              href={certificate.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              Validasi sertifikat
              <ExternalLink className="size-3.5" />
            </Link>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CertificatesSection;
