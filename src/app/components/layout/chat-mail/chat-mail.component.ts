import { AfterViewInit, ChangeDetectionStrategy, Component, computed, effect, ElementRef, HostBinding, inject, OnInit, signal, ViewChild } from '@angular/core';
import { ButtonComponent } from '../../base/button.component';
import { NgClass } from '@angular/common';
import { DocumentListenerService } from '../../../services/document-listener.service';
import { LANGUAGE_APPLICATION } from '../../../tokens/language.tokens';
import { ViewportCheckerDirective } from '../../../directives/viewport-checker.directive';

type ContactChannel = 'whatsapp' | 'email';
export interface PredefinedMessage {
  label: string;
  value: string;
}
@Component({
  selector: 'app-chat-mail',
  host: {
    class: "flex flex-col justify-between bg-neutral-900 rounded-2xl p-4 outline-1 outline-transparent focus-within:outline-1 transition-colors"
  },
  hostDirectives: [ViewportCheckerDirective],
  imports: [ButtonComponent, NgClass],
  templateUrl: './chat-mail.component.html',
  styles: `
  #contactme, #predefined-messages { scrollbar-width: thin; }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatMailComponent implements AfterViewInit, OnInit {
  private documentListener = inject(DocumentListenerService);
  private viewportChecker = inject(ViewportCheckerDirective);
  lg = inject(LANGUAGE_APPLICATION);
  //
  type = signal<ContactChannel>('whatsapp');
  message = signal('');
  predefinedMessages = computed<PredefinedMessage[]>(() => this.lg().contact.chat.predefined_messages)
  @ViewChild('textarea') textarea!: ElementRef<HTMLTextAreaElement>;

  ngOnInit(): void {
    this.viewportChecker.viewportChange.subscribe(isVisible => {
      if (isVisible) this.focusTextArea(true);
    });
  }

  ngAfterViewInit(): void {
    this.resizeTextArea();
  }

  constructor() {
    effect(() => {
      const detectScreenChange = this.documentListener.screenSize$(); // trigger effect on screen size change
      this.resizeTextArea();
    })
  }

  setType(type: ContactChannel) {
    this.type.set(type);
  }

  setMessage(text: string) {
    this.message.set(text);
  }

  sendMessage() {
    const emailSubject = encodeURIComponent(this.lg().contact.email_subject);
    const encodedMessage = encodeURIComponent(this.message());
    if (this.type() === 'whatsapp') {
      window.open(`https://api.whatsapp.com/send?phone=5561996111423&text=${ encodedMessage }`);
    } else {
      window.open(`mailto:edumoreira.dev@gmail.com?subject=${ emailSubject }&body=${ encodedMessage }`);
    }
    console.log(encodeURIComponent(this.message()));
  }

  onInput(event: Event){
    const textArea = event.target as HTMLTextAreaElement;
    this.setMessage(textArea.value);
    this.resizeTextArea();
  }


  private resizeTextArea(): void {
    if (this.textarea) {
      const textAreaElement = this.textarea.nativeElement;
      textAreaElement.style.height = 'auto';
      textAreaElement.style.height = textAreaElement.scrollHeight + 'px';
    }
  }

  surfaceClick() {
    const textarea = this.textarea.nativeElement;
    const length = textarea.value.length;
    textarea.setSelectionRange(length, length);
    this.focusTextArea();
  }

  applyPredefinedMessage(message: PredefinedMessage) {
    this.focusTextArea();
    this.setMessage(message.value);
    this.resizeTextArea();
  }

  focusTextArea(preventScroll: boolean = false) {
    const textarea = this.textarea.nativeElement;
    textarea.focus({ preventScroll: preventScroll });
  }

  @HostBinding('class')
  get variantClasses() {
    return this.type() === 'whatsapp' ? 'focus-within:outline-green-800' : 'focus-within:outline-neutral-600'
  }
}
